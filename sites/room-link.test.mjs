import test from 'node:test';
import assert from 'node:assert/strict';
import { roomLink } from './web/room-link.js';

test('only an unambiguous, complete room link selects a role', () => {
  const token = 'a'.repeat(64);
  assert.deepEqual(roomLink(''), { mode: 'demo' });
  assert.deepEqual(roomLink('#play=' + token), { mode: 'play', token });
  assert.deepEqual(roomLink('#report=' + token), { mode: 'report', token });
  for (const hash of ['#play=', '#report', '#play=a', '#play=&report=' + token,
    '#play=' + token + '&report=' + token, '#play=' + token + '&play=' + token]) {
    assert.deepEqual(roomLink(hash), { mode: 'invalid' }, hash);
  }
});
