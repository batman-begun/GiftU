import { test } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createApp } from './server.js';

async function fixture(t) {
  const server = createApp(':memory:').listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise(resolve => server.close(resolve)));
  return async (path, body, token) => {
    const headers = {};
    if (token) headers.Authorization = 'Bearer ' + token;
    if (body) headers['Content-Type'] = 'application/json';
    const response = await fetch('http://127.0.0.1:' + server.address().port + '/api/' + path,
      { method: body ? 'POST' : 'GET', headers, body: body && JSON.stringify(body) });
    return [response.status, await response.json()];
  };
}

for (const [profile, expected, approved] of [
  ['for_her', ['lip', 'spa'], true],
  ['for_him', ['gadget', 'fragrance'], false],
]) {
  test(profile + ' uses the same flow with isolated link permissions', async t => {
    const call = await fixture(t);
    const [created, { sender, receiver }] = await call('rooms', { profile });
    assert.equal(created, 201);
    const [, { deck }] = await call('play', null, receiver);
    assert.deepEqual(deck.map(item => item.id), ['toilet', ...expected]);
    assert.equal(deck[1].gift, undefined);
    assert.equal((await call('play', null, sender))[0], 404);
    assert.equal((await call('report', null, receiver))[0], 404);
    assert.deepEqual(await call('report', null, sender), [200, { status: 'unavailable' }]);
    assert.equal((await call('finish', { approved: true, ids: [] }, receiver))[0], 400);
    await call('react', { index: 0, action: 'like' }, receiver);
    assert.equal((await call('react', { index: 0, action: 'skip' }, receiver))[0], 409);
    await call('react', { index: 1, action: 'like' }, receiver);
    assert.deepEqual((await call('play', null, receiver))[1].progress, ['like', 'like']);
    assert.deepEqual((await call('react', { index: 2, action: 'undo' }, receiver))[1].progress, ['like']);
    await call('react', { index: 1, action: 'like' }, receiver);
    await call('react', { index: 2, action: 'skip' }, receiver);
    for (const id of ['toilet', expected[1]]) {
      assert.equal((await call('finish', { approved: true, ids: [id] }, receiver))[0], 400);
    }
    assert.equal((await call('finish', { approved, ids: approved ? [expected[0]] : [] }, receiver))[0], 200);
    const [, report] = await call('report', null, sender);
    assert.deepEqual(report, approved ? {
      status: 'shared',
      cards: [{ label: 'Son và trang điểm', gift: 'Set son mini', tip: 'Xem tông màu người ấy dùng thường xuyên.' }],
    } : { status: 'unavailable' });
    assert.equal((await call('react', { index: 3, action: 'undo' }, receiver))[0], 409);
  });
}

test('liking only the troll can produce a shared empty report', async t => {
  const call = await fixture(t);
  const [, { sender, receiver }] = await call('rooms', { profile: 'for_him' });
  for (const [index, action] of ['like', 'skip', 'skip'].entries()) {
    assert.equal((await call('react', { index, action }, receiver))[0], 200);
  }
  assert.equal((await call('finish', { approved: true, ids: [] }, receiver))[0], 200);
  assert.deepEqual(await call('report', null, sender), [200, { status: 'shared', cards: [] }]);
});
