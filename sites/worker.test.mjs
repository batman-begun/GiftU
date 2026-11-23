import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from './dist/server/index.js';
import { createLocalDatabase } from './local/database.mjs';

async function call(DB, path, token, data) {
  const headers = token ? {Authorization:'Bearer '+token} : {};
  const response = await worker.fetch(new Request('https://giftu.test/api/'+path, {
    method:data?'POST':'GET',headers,body:data && JSON.stringify(data),
  }),{DB});
  return [response.status, await response.json()];
}

test('shared room works across independent clients and enforces consent', async t => {
  const DB = createLocalDatabase();
  t.after(() => DB.close());
  for (const [profile,id,approved,ids] of [['her',1,true,[1]],['him',3,false,[]],['him',3,true,[]]]) {
    const [created,{sender,receiver}] = await call(DB, 'rooms',null,{profile});
    assert.equal(created,201);
    assert.equal((await call(DB, 'report',receiver))[0],404);
    assert.equal((await call(DB, 'play',sender))[0],404);
    assert.equal((await call(DB, 'play',receiver))[1].deck[1],id);
    for (const [index,action] of ['like','like','skip'].entries()) {
      assert.equal((await call(DB, 'react',receiver,{index,action}))[0],200);
    }
    assert.deepEqual((await call(DB, 'play',receiver))[1].progress,['like','like','skip']);
    assert.equal((await call(DB, 'finish',receiver,{index:3,approved:true,ids:[0]}))[0],400);
    assert.deepEqual((await call(DB, 'report',sender))[1],{status:'unavailable'});
    assert.equal((await call(DB, 'finish',receiver,{index:3,approved,ids}))[0],200);
    assert.deepEqual((await call(DB, 'report',sender))[1],approved?{status:'shared',ids}:{status:'unavailable'});
  }
});


test('a hunt link exposes only the clue until solved and expires separately from rooms', async t => {
  const DB = createLocalDatabase();
  t.after(() => DB.close());
  const draft = {clue:'Quán đầu tiên?', answer:'Cà phê Đá', reveal:'Mở ngăn kéo bên trái.'};
  assert.equal((await call(DB, 'hunts', null, {...draft, answer:'   '}))[0], 400);
  assert.equal((await call(DB, 'hunts', null, {...draft, reveal:'a'.repeat(501)}))[0], 400);

  const [status, {token}] = await call(DB, 'hunts', null, draft);
  assert.equal(status, 201);
  assert.match(token, /^[a-f0-9]{64}$/);
  assert.deepEqual(await call(DB, 'hunt', token), [200, {clue: draft.clue}]);
  assert.deepEqual(await call(DB, 'hunt/solve', token, {answer:'sai'}), [200, {solved:false}]);
  assert.deepEqual(await call(DB, 'hunt/solve', token, {answer:' CA  PHE DA '}), [200, {solved:true, reveal:draft.reveal}]);
  assert.equal((await call(DB, 'report', token))[0], 404);

  const [, room] = await call(DB, 'rooms', null, {profile:'her'});
  assert.equal((await call(DB, 'hunt', room.receiver))[0], 404);
  assert.equal((await call(DB, 'hunt', room.sender))[0], 404);
  DB.prepare('UPDATE gift_hunts SET expires = ?').bind(Date.now() - 1).run();
  assert.equal((await call(DB, 'hunt', token))[0], 404);
  assert.equal((await call(DB, 'hunt/solve', token, {answer:draft.answer}))[0], 404);
  assert.equal((await call(DB, 'play', room.receiver))[0], 200);
});

test('the clay sprite is served with its SVG media type', async () => {
  const response = await worker.fetch(new Request('https://giftu.test/clay-gifts.svg'), {});
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Content-Type'), 'image/svg+xml');
  const source = await response.text();
  for (let id = 0; id < 5; id++) assert.match(source, new RegExp('id="gift-' + id + '"'));
});

test('the GuBot atlas loads as WebP inside its initial asset budget', async () => {
  const response = await worker.fetch(new Request('https://giftu.test/gubot-clay-v1.webp'), {});
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Content-Type'), 'image/webp');
  const bytes = Buffer.from(await response.arrayBuffer());
  assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
  assert.ok(bytes.length < 200_000);
});
