import { test } from 'node:test';
import assert from 'node:assert/strict';
import { botCell, mouthCell, palette, poses } from './web/matrix-art.js';
import { matrix } from './web/matrix.js';

test('the scoop, cone and spill stay distinguishable with a feathered body', () => {
  assert.equal(botCell(33, 40, 5, .5).strength, 1);
  assert.equal(botCell(25, 81, 5, .5).ink, 0);
  assert.ok(botCell(62, 76, 5, .5).strength > .6);
  assert.equal(botCell(75, 75, 5, .5).strength, 0);
  const edge = botCell(40, 24, 5, .5).strength;
  assert.ok(edge > 0 && edge < 1);
  assert.ok(botCell(26, 43.5, 5, .5).strength < .12);
});

test('every expression has distinct glyph-cell geometry', () => {
  const positions = Array.from({length: 35 * 27}, (_, i) => [i % 35 + 21, Math.floor(i / 35) + 39]);
  const mouths = Object.values(poses).map(pose => positions
    .map(([x, y]) => Number(mouthCell(x, y, pose, 1))).join(''));
  assert.equal(new Set(mouths).size, 5);

});

test('the tear displaces binary glyphs before settling back onto the grid', t => {
  const frames = new Map();
  let serial = 0;
  let now = 100;
  const mocks = {
    matchMedia: () => ({ matches: false, addEventListener() {} }),
    requestAnimationFrame: callback => { frames.set(++serial, callback); return serial; },
    cancelAnimationFrame: id => frames.delete(id),
    devicePixelRatio: 2,
    document: { hidden: false, addEventListener() {} },
    ResizeObserver: class { observe() {} },
    performance: { now: () => now },
  };
  for (const [name, value] of Object.entries(mocks)) {
    const previous = Object.getOwnPropertyDescriptor(globalThis, name);
    Object.defineProperty(globalThis, name, {value, configurable:true});
    t.after(() => previous ? Object.defineProperty(globalThis, name, previous) : delete globalThis[name]);
  }
  const ink = [];
  // Any primitive other than glyphs, clearing and the DPR transform would fail here.
  const ctx = {
    clearRect() { ink.length = 0; },
    setTransform() {},
    fillText(bit, x, y) { ink.push([bit, x, y, this.fillStyle]); },
  };
  const room = { addEventListener() {} };
  const canvas = {parentElement:room, getContext:() => ctx,
    getBoundingClientRect:() => ({left:0, top:0, width:358, height:470})};
  const avatar = {getBoundingClientRect:() => ({left:12, top:58, width:198, height:188})};
  const artifact = {getBoundingClientRect:() => ({left:216, top:58, width:130, height:188})};
  const change = matrix(canvas, avatar, artifact);
  function tick(time, moving = false) {
    now = time;
    const scheduled = [...frames.values()];
    frames.clear();
    for (const callback of scheduled) callback(time);
    const occupied = new Set();
    for (const [bit, x, y] of ink) {
      assert.match(bit, /^[01]$/);
      if (!moving) {
        assert.equal(x % 6, 3);
        assert.equal(y % 6, 3);
      }
      const position = x + ',' + y;
      assert.ok(!occupied.has(position));
      occupied.add(position);
    }
  }
  change();
  tick(100);
  const confident = ink.filter(cell => cell[3] === palette[8]);
  assert.ok(confident.length >= 6);
  change({item:3, mood:'confident'});
  tick(420, true);
  assert.ok(ink.some(([, x, y, color]) => x > 220 && x % 6 !== 3 && y % 6 !== 3 && color === palette[3]));
  tick(760);
  change({item:3, mood:'sorry', reaction:'no'});
  tick(820);
  tick(900);
  tick(980);
  assert.notDeepEqual(ink.filter(cell => cell[3] === palette[8]), confident);
});
