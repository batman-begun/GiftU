import { test } from 'node:test';
import assert from 'node:assert/strict';
import { palette } from './web/matrix-art.js';
import { matrix } from './web/matrix.js';

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
  const artifact = {getBoundingClientRect:() => ({left:216, top:58, width:130, height:188})};
  const change = matrix(canvas, artifact);
  function tick(time, moving = false) {
    now = time;
    const scheduled = [...frames.values()];
    frames.clear();
    for (const callback of scheduled) callback(time);
    const occupied = new Set();
    for (const [bit, x, y] of ink) {
      assert.match(bit, /^[01]$/);
      if (!moving) {
        assert.equal(x % 5, 2.5);
        assert.equal(y % 5, 2.5);
      }
      const position = x + ',' + y;
      assert.ok(!occupied.has(position));
      occupied.add(position);
    }
  }
  change();
  tick(100);
  assert.ok(!ink.some(cell => cell[3] === palette[8]));
  change({item:3});
  tick(420, true);
  assert.ok(ink.some(([, x, y, color]) => x > 220 && x % 5 !== 2.5 && y % 5 !== 2.5 && color === palette[3]));
  tick(760);
  change({item:3, reaction:'no'});
  tick(820, true);
  tick(900, true);
  tick(980, true);
  assert.ok(ink.some(([, x, y, color]) => x > 220 && y % 5 !== 2.5 && color === palette[8]));
  tick(1500);
  assert.ok(!ink.some(cell => cell[3] === palette[8]));
});
