import {botCell, cellNoise, digitFor, itemCell, mouthCell, palette, poses} from './matrix-art.js';

const STEP = 6;
const EFFECT_MS = 330;
const ambientInk = ['#7a5146', '#7e506c', '#746187', '#526779', '#746221', '#4d756e'];
const lerp = (from, to, amount) => from + (to - from) * amount;

export function matrix(canvas, avatar, artifact) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  const room = canvas.parentElement;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = null;
  let points = [];
  let width = 0, height = 0;
  let botScale = 1, itemScale = 1;
  let itemId = null, effect = null, pose = poses.confident;
  let currentPose = pose;
  let lastDraw = 0;
  let wave;

  function layout() {
    frame = null;
    const rect = canvas.getBoundingClientRect();
    const bounds = avatar.getBoundingClientRect();
    const itemBounds = artifact.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    botScale = Math.max(.1, Math.min(bounds.width / 74, bounds.height / 90));
    itemScale = Math.max(.1, Math.min(itemBounds.width, itemBounds.height) / 15);
    const botX = bounds.left - rect.left + bounds.width / 2;
    const botY = bounds.top - rect.top + bounds.height / 2;
    const itemX = itemBounds.left - rect.left + itemBounds.width / 2;
    const itemY = itemBounds.top - rect.top + itemBounds.height / 2;
    points = [];
    for (let row = 0; row * STEP < height; row++) {
      for (let col = 0; col * STEP < width; col++) {
        const x = (col + .5) * STEP;
        const y = (row + .5) * STEP;
        const bx = (x - botX) / botScale + 40;
        const by = (y - botY) / botScale + 64;
        const insideBotBox = bx > 3 && bx < 78 && by > 17 && by < 110;
        const v = cellNoise(col, row);
        const art = insideBotBox ? botCell(bx, by, Math.max(4.8, STEP / botScale * 2.1), cellNoise(col, row, 1)) : null;
        const ix = (x - itemX) / itemScale;
        const iy = (y - itemY) / itemScale;
        const byItem = itemId !== null && Math.abs(ix) < 10 && Math.abs(iy) < 13;
        if (v < .26 || art?.strength || byItem) points.push({
          x, y, bx, by, ix, iy, v, art,
          byItem, bit: digitFor(cellNoise(col, row, 2)),
          ink: ambientInk[Math.floor(cellNoise(col, row, 3) * ambientInk.length)],
          nearMouth: bx > 22 && bx < 54 && by > 41 && by < 63,
        });
      }
    }
  }

  function draw(time) {
    frame = null;
    if (document.hidden) return;
    const reduced = motion.matches;
    const age = effect ? Math.min(1, (time - effect.start) / EFFECT_MS) : 0;
    if (wave && (reduced || time - wave.time >= 530)) wave = undefined;
    if (reduced) currentPose = pose;
    else currentPose = pose.map((value, index) => lerp(currentPose[index], value, .42));
    const animatingPose = pose.some((value, i) => Math.abs(value - currentPose[i]) > .035);
    ctx.clearRect(0, 0, width, height);
    ctx.font = '7px monospace';
    const mouthThickness = Math.max(.92, STEP / botScale * .67);
    const reveal = effect?.type === 'reveal' ? age : 1;
    const reacting = effect && effect.type !== 'reveal';
    const opacity = reacting ? 1 - age : 1;
    const scaleX = effect?.type === 'like' ? 1 + Math.sin(age * Math.PI) * .38 : 1;
    const scaleY = effect?.type === 'like' ? 1 - age * .37 : 1;
    const drop = effect?.type === 'no' ? age * 5 : 0;
    for (const p of points) {
      let ink = p.ink;
      let alpha = p.v < .26 ? .33 : 0;
      if (p.art?.strength && p.v < .26 + p.art.strength * .72) {
        ink = palette[p.art.ink];
        alpha = .34 + p.art.strength * .64;
      }
      if (p.nearMouth && mouthCell(p.bx, p.by, currentPose, mouthThickness)) {
        ink = palette[8];
        alpha = 1;
      }
      if (p.byItem && Math.abs(p.iy) <= Math.max(.5, reveal * 7) + drop) {
        const itemInk = itemCell(itemId, p.ix / scaleX + 6.5, (p.iy - drop) / scaleY + 6.5);
        if (itemInk !== undefined && (!reacting || p.v < opacity)) {
          ink = palette[itemInk];
          alpha = .92;
        }
      }
      if (wave && alpha) {
        const radius = (time - wave.time) * .45;
        if (Math.abs(Math.hypot(p.x - wave.x, p.y - wave.y) - radius) < 13) {
          alpha = Math.min(1, alpha + .28 * (1 - radius / 240));
        }
      }
      if (alpha) {
        ctx.fillStyle = ink;
        ctx.globalAlpha = alpha;
        ctx.fillText(p.bit, p.x, p.y);
      }
    }
    ctx.globalAlpha = 1;
    if (!reduced && (animatingPose || wave || (effect && age < 1))) queue();
  }

  function queue() {
    if (frame !== null || document.hidden) return;
    frame = requestAnimationFrame(time => {
      frame = null;
      if (!motion.matches && time - lastDraw < 26) return queue();
      lastDraw = time;
      draw(time);
    });
  }

  function refresh() {
    if (frame !== null) cancelAnimationFrame(frame);
    layout();
    queue();
  }

  const observer = new ResizeObserver(refresh);
  observer.observe(room);
  observer.observe(avatar);
  observer.observe(artifact);
  room.addEventListener('pointerdown', event => {
    if (motion.matches || event.target.closest('button,a,select')) return;
    const box = canvas.getBoundingClientRect();
    wave = { x: event.clientX - box.left, y: event.clientY - box.top, time: performance.now() };
    queue();
  });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
  motion.addEventListener('change', () => { effect = wave = null; queue(); });

  return ({ item = null, mood = 'confident', reaction } = {}) => {
    pose = poses[mood] ?? poses.confident;
    if (motion.matches) effect = null;
    else if (reaction) effect = { type: reaction, start: performance.now() };
    else if (item !== itemId || (effect && effect.type !== 'reveal')) {
      effect = item === null ? null : { type: 'reveal', start: performance.now() };
    }
    if (item !== itemId || !points.length) {
      itemId = item;
      refresh();
    } else queue();
  };
}
