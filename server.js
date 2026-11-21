import { createServer } from 'node:http';
import { randomBytes, createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { makeDeck, profiles } from './catalog.js';

const assets = new Map([
  ['/', ['index.html', 'text/html']],
  ['/app.js', ['app.js', 'text/javascript']],
  ['/style.css', ['style.css', 'text/css']],
]);
const digest = value => createHash('sha256').update(value).digest('hex');
const token = () => randomBytes(32).toString('base64url');
const reactions = new Set(['like', 'dislike', 'skip']);

async function readJson(request) {
  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 4096) return null;
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks));
  } catch {
    return null;
  }
}

export function createApp(databasePath = process.env.GIFTU_DB ?? 'giftu.sqlite') {
  const db = new DatabaseSync(databasePath);
  db.exec(`PRAGMA busy_timeout = 5000;
    CREATE TABLE IF NOT EXISTS rooms (
      sender TEXT PRIMARY KEY, receiver TEXT UNIQUE NOT NULL,
      deck TEXT NOT NULL, progress TEXT NOT NULL, outcome TEXT,
      expires INTEGER NOT NULL
    )`);
  const insert = db.prepare('INSERT INTO rooms VALUES (?, ?, ?, ?, NULL, ?)');
  const bySender = db.prepare('SELECT * FROM rooms WHERE sender = ? AND expires > ?');
  const byReceiver = db.prepare('SELECT * FROM rooms WHERE receiver = ? AND expires > ?');
  const save = db.prepare('UPDATE rooms SET progress = ? WHERE receiver = ? AND progress = ? AND outcome IS NULL AND expires > ?');
  const finish = db.prepare('UPDATE rooms SET outcome = ? WHERE receiver = ? AND progress = ? AND outcome IS NULL AND expires > ?');
  const prune = db.prepare('DELETE FROM rooms WHERE expires <= ?');

  const server = createServer(async (req, res) => {
    const path = new URL(req.url, 'http://localhost').pathname;
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const send = (status, value) => {
      res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(value));
    };
    try {
      if (req.method === 'GET' && assets.has(path)) {
        const [name, type] = assets.get(path);
        res.writeHead(200, { 'Content-Type': type + '; charset=utf-8' });
        return res.end(readFileSync(new URL('./public/' + name, import.meta.url)));
      }
      if (req.method === 'POST' && path === '/api/rooms') {
        const body = await readJson(req);
        if (!Object.hasOwn(profiles, body?.profile ?? '')) return send(400, { error: 'Chọn bộ quà hợp lệ.' });
        const sender = token();
        const receiver = token();
        const now = Date.now();
        prune.run(now);
        insert.run(digest(sender), digest(receiver), JSON.stringify(makeDeck(body.profile)), '[]', now + 7 * 86400000);
        return send(201, { sender, receiver });
      }
      const match = /^Bearer ([\w-]{43})$/.exec(req.headers.authorization ?? '');
      if (!match) return send(401, { error: 'Link truy cập không hợp lệ.' });
      const key = digest(match[1]);
      if (req.method === 'GET' && path === '/api/report') {
        const room = bySender.get(key, Date.now());
        if (!room) return send(404, { error: 'Không tìm thấy phòng.' });
        const outcome = JSON.parse(room.outcome);
        if (!outcome?.approved) return send(200, { status: 'unavailable' });
        const cards = JSON.parse(room.deck)
          .filter(item => outcome.ids.includes(item.id))
          .map(({ label, gift, tip }) => ({ label, gift, tip }));
        return send(200, { status: 'shared', cards });
      }
      if (req.method === 'GET' && path === '/api/play') {
        const room = byReceiver.get(key, Date.now());
        if (!room) return send(404, { error: 'Không tìm thấy phòng.' });
        const deck = JSON.parse(room.deck).map(({ id, label, icon, joke, kind }) => ({
          id, label, icon, joke, kind: kind ?? 'real',
        }));
        return send(200, { deck, progress: JSON.parse(room.progress), done: room.outcome !== null });
      }
      if (req.method === 'POST' && ['/api/react', '/api/finish'].includes(path)) {
        const body = await readJson(req);
        if (!body) return send(400, { error: 'Dữ liệu không hợp lệ.' });
        const room = byReceiver.get(key, Date.now());
        if (!room) return send(404, { error: 'Không tìm thấy phòng.' });
        const progress = JSON.parse(room.progress);
        const deck = JSON.parse(room.deck);
        const invalid = () => send(400, { error: 'Lựa chọn không hợp lệ.' });
        const conflict = () => send(409, { error: 'Phòng đã thay đổi. Tải lại để tiếp tục.' });
        if (path === '/api/react') {
          if (room.outcome !== null || body.index !== progress.length) return conflict();
          if (body.action === 'undo' && progress.length) progress.pop();
          else if (progress.length < deck.length && reactions.has(body.action)) progress.push(body.action);
          else return invalid();
          if (!save.run(JSON.stringify(progress), key, room.progress, Date.now()).changes) return conflict();
          return send(200, { progress });
        }
        if (room.outcome !== null) return conflict();
        if (progress.length !== deck.length || typeof body.approved !== 'boolean' || !Array.isArray(body.ids) ||
            body.ids.length > 3 || new Set(body.ids).size !== body.ids.length ||
            (!body.approved && body.ids.length) ||
            !body.ids.every(id => deck.some((item, i) => item.id === id && item.kind !== 'decoy' && progress[i] === 'like'))) return invalid();
        const outcome = { approved: body.approved, ids: body.ids };
        if (!finish.run(JSON.stringify(outcome), key, room.progress, Date.now()).changes) return conflict();
        return send(200, { done: true });
      }
      return send(404, { error: 'Không tìm thấy trang.' });
    } catch (error) {
      console.error(error);
      if (!res.headersSent) send(500, { error: 'Có lỗi. Thử tải lại phòng.' });
    }
  });
  server.on('close', () => db.close());
  return server;
}

if (process.argv[1] && import.meta.url === new URL(process.argv[1], 'file:').href) {
  const port = Number(process.env.PORT ?? 3000);
  createApp().listen(port, () => console.log('GiftU listening on port ' + port));
}
