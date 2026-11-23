import assets from './assets.js';

const deckByProfile = { her: [0, 1, 2], him: [0, 3, 4] };
const ttl = 7 * 86400000;
const noStore = { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff' };
const json = (data, status = 200) => Response.json(data, { status, headers: noStore });
const error = status => json({ error: true }, status);
const toHex = bytes => Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
const secret = () => toHex(crypto.getRandomValues(new Uint8Array(32)));
const hash = async token => toHex(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token))));
const mime = { html: 'text/html', js: 'text/javascript', css: 'text/css', png: 'image/png', webp: 'image/webp', svg: 'image/svg+xml', webmanifest: 'application/manifest+json' };

async function body(request, limit = 1024) {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const decoder = new TextDecoder();
  let size = 0;
  let input = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > limit) {
      await reader.cancel();
      return null;
    }
    input += decoder.decode(value, { stream: true });
  }
  try { return JSON.parse(input + decoder.decode()); } catch { return null; }
}

const huntText = (value, limit) => typeof value === 'string' && value.length <= limit ? value.trim() : '';
const normalizeAnswer = value => value.normalize('NFD').toLowerCase()
  .replace(/\p{M}/gu, '').replace(/đ/g, 'd').trim().replace(/\s+/gu, ' ');
const bearer = request => /^Bearer ([a-f0-9]{64})$/.exec(request.headers.get('Authorization') ?? '')?.[1];

async function huntApi(request, path, db, now) {
  if (path === '/api/hunts' && request.method === 'POST') {
    const data = await body(request, 8192);
    const clue = huntText(data?.clue, 300);
    const answer = normalizeAnswer(huntText(data?.answer, 100));
    const reveal = huntText(data?.reveal, 500);
    if (!clue || !answer || !reveal) return error(400);
    const token = secret();
    const key = await hash(token);
    await db.batch([
      db.prepare('DELETE FROM gift_hunts WHERE expires <= ?').bind(now),
      db.prepare('INSERT INTO gift_hunts(token, clue, answer, reveal, expires) VALUES (?, ?, ?, ?, ?)')
        .bind(key, clue, await hash(key + answer), reveal, now + ttl),
    ]);
    return json({ token }, 201);
  }

  const reading = path === '/api/hunt' && request.method === 'GET';
  const solving = path === '/api/hunt/solve' && request.method === 'POST';
  if (!reading && !solving) return error(404);
  const token = bearer(request);
  if (!token) return error(401);
  const key = await hash(token);
  const fields = reading ? 'clue' : 'answer, reveal';
  const hunt = await db.prepare('SELECT ' + fields + ' FROM gift_hunts WHERE token = ? AND expires > ?').bind(key, now).first();
  if (!hunt) return error(404);
  if (reading) return json({ clue: hunt.clue });
  const data = await body(request);
  const answer = normalizeAnswer(huntText(data?.answer, 100));
  if (!answer) return error(400);
  if (await hash(key + answer) !== hunt.answer) return json({ solved: false });
  return json({ solved: true, reveal: hunt.reveal });
}

async function api(request, path, db) {
  const now = Date.now();
  if (path === '/api/hunts' || path === '/api/hunt' || path === '/api/hunt/solve') return huntApi(request, path, db, now);
  if (request.method === 'POST' && path === '/api/rooms') {
    const data = await body(request);
    if (!Object.hasOwn(deckByProfile, data?.profile ?? '')) return error(400);
    const sender = secret();
    const receiver = secret();
    await db.batch([
      db.prepare('DELETE FROM gift_rooms WHERE expires <= ?').bind(now),
      db.prepare('INSERT INTO gift_rooms(sender, receiver, deck, expires) VALUES (?, ?, ?, ?)')
        .bind(await hash(sender), await hash(receiver), JSON.stringify(deckByProfile[data.profile]), now + ttl),
    ]);
    return json({ sender, receiver }, 201);
  }

  const reports = path === '/api/report' && request.method === 'GET';
  const playing = path === '/api/play' && request.method === 'GET';
  const reacting = path === '/api/react' && request.method === 'POST';
  const finishing = path === '/api/finish' && request.method === 'POST';
  if (!reports && !playing && !reacting && !finishing) return error(404);
  const token = bearer(request);
  if (!token) return error(401);
  const key = await hash(token);
  const column = reports ? 'sender' : 'receiver';
  const row = await db.prepare('SELECT deck, progress, outcome FROM gift_rooms WHERE ' + column + ' = ? AND expires > ?').bind(key, now).first();
  if (!row) return error(404);
  const outcome = JSON.parse(row.outcome);
  if (reports) return json(outcome?.approved ? { status: 'shared', ids: outcome.ids } : { status: 'unavailable' });
  const deck = JSON.parse(row.deck);
  const progress = JSON.parse(row.progress);
  if (playing) return json({ deck, progress, done: outcome !== null });
  const data = await body(request);
  if (!data) return error(400);
  if (outcome !== null || data.index !== progress.length) return error(409);
  const update = async (column, value) => {
    const result = await db.prepare('UPDATE gift_rooms SET ' + column + ' = ? WHERE receiver = ? AND progress = ? AND outcome IS NULL AND expires > ?')
      .bind(JSON.stringify(value), key, row.progress, Date.now()).run();
    return result.meta.changes > 0;
  };
  if (reacting) {
    if (data.action === 'undo' && progress.length) progress.pop();
    else if (progress.length < deck.length && ['like', 'no', 'skip'].includes(data.action)) progress.push(data.action);
    else return error(400);
    return await update('progress', progress) ? json({ progress }) : error(409);
  }
  const { approved, ids } = data;
  if (progress.length !== deck.length || typeof approved !== 'boolean' || !Array.isArray(ids) ||
      ids.length > 3 || new Set(ids).size !== ids.length || (!approved && ids.length) ||
      !ids.every(id => id !== 0 && deck.includes(id) && progress[deck.indexOf(id)] === 'like')) return error(400);
  return await update('outcome', { approved, ids }) ? json({ done: true }) : error(409);
}

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (path.startsWith('/api/')) {
      try { return await api(request, path, env.DB); }
      catch (problem) { console.error('GiftU API failure', problem.message); return error(503); }
    }
    const name = path === '/' ? '/index.html' : path;
    if (!Object.hasOwn(assets, name) || !['GET', 'HEAD'].includes(request.method)) return error(404);
    const bytes = Uint8Array.from(atob(assets[name]), char => char.charCodeAt(0));
    const type = mime[name.split('.').at(-1)] ?? 'application/octet-stream';
    return new Response(request.method === 'HEAD' ? null : bytes, {
      headers: { ...noStore, 'Content-Type': type },
    });
  },
};
