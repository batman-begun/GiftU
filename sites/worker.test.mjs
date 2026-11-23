import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from './dist/server/index.js';
import { createLocalDatabase } from './local/database.mjs';

test('shared room works across independent clients and enforces consent', async t => {
  const DB = createLocalDatabase();
  t.after(() => DB.close());
  async function call(path, token, data) {
    const headers = token ? {Authorization:'Bearer '+token} : {};
    const response = await worker.fetch(new Request('https://giftu.test/api/'+path,{
      method:data?'POST':'GET',headers,body:data && JSON.stringify(data),
    }),{DB});
    return [response.status, await response.json()];
  }
  for (const [profile,id,approved] of [['her',1,true],['him',3,false]]) {
    const [created,{sender,receiver}] = await call('rooms',null,{profile});
    assert.equal(created,201);
    assert.equal((await call('report',receiver))[0],404);
    assert.equal((await call('play',sender))[0],404);
    assert.equal((await call('play',receiver))[1].deck[1],id);
    for (const [index,action] of ['like','like','skip'].entries()) {
      assert.equal((await call('react',receiver,{index,action}))[0],200);
    }
    assert.deepEqual((await call('play',receiver))[1].progress,['like','like','skip']);
    assert.equal((await call('finish',receiver,{index:3,approved:true,ids:[0]}))[0],400);
    assert.deepEqual((await call('report',sender))[1],{status:'unavailable'});
    assert.equal((await call('finish',receiver,{index:3,approved,ids:approved?[id]:[]}))[0],200);
    assert.deepEqual((await call('report',sender))[1],approved?{status:'shared',ids:[id]}:{status:'unavailable'});
  }
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
