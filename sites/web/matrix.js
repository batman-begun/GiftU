import {botCell, cellNoise, digitFor, mouthCell, palette, poses} from './matrix-art.js';

const STEP = 6;
export const TEAR_MS = 640;
const WAVE_MS = 880;
const ambientInk = ['#7a5146', '#7e506c', '#746187', '#526779', '#746221', '#4d756e'];
const lerp = (from, to, amount) => from + (to - from) * amount;

export function matrix(canvas, avatar, artifact, {shade = () => [], quiet = () => false} = {}) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  const root = canvas.parentElement;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = null;
  let points = [];
  let width = 0, height = 0;
  let botScale = 1;
  let itemId = null, tearStart = null, pose = poses.confident;
  let currentPose = pose;
  let lastDraw = 0;
  let wave;
  let calm = false;

  function layout() {
    frame = null;
    const rect = canvas.getBoundingClientRect();
    const bounds = avatar.getBoundingClientRect();
    const itemBounds = artifact.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    const backingWidth = Math.round(width * ratio);
    const backingHeight = Math.round(height * ratio);
    if (canvas.width !== backingWidth) canvas.width = backingWidth;
    if (canvas.height !== backingHeight) canvas.height = backingHeight;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    botScale = Math.max(.1, Math.min(bounds.width / 67, bounds.height / 85));
    const tearRadius = Math.min(itemBounds.width, itemBounds.height, 240) * .56;
    const botX = bounds.left - rect.left + bounds.width / 2;
    const botY = bounds.top - rect.top + bounds.height / 2;
    const itemX = itemBounds.left - rect.left + itemBounds.width / 2;
    const itemY = itemBounds.top - rect.top + itemBounds.height / 2;
    const textBounds = shade().map(element => element.getBoundingClientRect())
      .filter(box => box.width && box.height);
    calm = quiet();
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
        const iy = tearRadius ? (y - itemY) / tearRadius : 0;
        const seam = (x - itemX) - tearRadius * (.24 * iy + .08 * Math.sin(iy * 19));
        const byItem = itemId !== null && Math.abs(iy) < 1 && Math.abs(seam) < tearRadius;
        if (v >= .32 && !art?.strength && !byItem) continue;
        let shadeFactor = 1;
        for (const box of textBounds) {
          const dx = Math.max(box.left - rect.left - x, x - (box.right - rect.left), 0);
          const dy = Math.max(box.top - rect.top - y, y - (box.bottom - rect.top), 0);
          shadeFactor = Math.min(shadeFactor, .18 + Math.min(1, Math.max(dx, dy) / 16) * .82);
        }
        points.push({
          x, y, bx, by, iy, seam, tearRadius, v, art, shadeFactor,
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
    if (tearStart !== null && (reduced || time - tearStart >= TEAR_MS)) tearStart = null;
    const opening = tearStart === null ? 0 : Math.sin(Math.PI * (time - tearStart) / TEAR_MS);
    if (wave && (reduced || time - wave.time >= WAVE_MS)) wave = undefined;
    if (reduced) currentPose = pose;
    else currentPose = pose.map((value, index) => lerp(currentPose[index], value, .42));
    const breathing = reduced || calm ? 0 : Math.sin(time / 840) * .043;
    const radius = wave ? (time - wave.time) * .61 : 0;
    const energy = wave ? 1 - (time - wave.time) / WAVE_MS : 0;
    const animatingPose = pose.some((value, i) => Math.abs(value - currentPose[i]) > .035);
    ctx.clearRect(0, 0, width, height);
    ctx.font = '7px monospace';
    const mouthThickness = Math.max(1.05, STEP / botScale * .84);
    const mouthMargin = STEP / botScale * .95;
    for (const p of points) {
      let ink = p.ink;
      let alpha = p.v < .32 ? (calm ? .22 : .39) : 0;
      let x = p.x, y = p.y;
      if (p.art?.strength && p.v < .26 + p.art.strength * .72) {
        ink = palette[p.art.ink];
        alpha = .38 + p.art.strength * (.60 + breathing);
      }
      if (p.nearMouth) {
        if (mouthCell(p.bx, p.by, currentPose, mouthThickness)) {
          ink = palette[8];
          alpha = 1;
        } else if (mouthCell(p.bx, p.by, currentPose, mouthThickness + mouthMargin)) {
          alpha *= .34;
        }
      }
      if (opening && p.byItem && !p.art?.strength) {
        const lip = p.tearRadius * opening * Math.pow(1 - Math.abs(p.iy), .85) * .74;
        const distance = Math.abs(p.seam);
        if (distance < lip + 14 && lip > 1) {
          const edge = Math.max(0, 1 - distance / (lip + 14));
          const side = p.seam < 0 ? -1 : 1;
          x += side * lip * edge;
          y += side * edge * opening * (p.iy * 14 + Math.sin(p.y) * 4);
          alpha = Math.max(alpha, opening * (p.v < .58 ? .91 : .46) * edge);
          if (edge > .24) ink = palette[p.v < .5 ? 8 : 3];
        }
      }
      if (wave && alpha && p.shadeFactor > .7) {
        const dx = p.x - wave.x;
        const dy = p.y - wave.y;
        const distance = Math.hypot(dx, dy);
        const front = Math.max(0, 1 - Math.abs(distance - radius) / 29);
        const indent = Math.max(0, 1 - distance / 46) * Math.max(0, 1 - radius / 115);
        alpha = Math.min(1, alpha + .42 * energy * front) * (1 - .78 * indent);
        const shift = front * energy * 2.7 / Math.max(1, distance);
        x += dx * shift;
        y += dy * shift;
      }
      alpha *= p.shadeFactor;
      if (alpha) {
        ctx.fillStyle = ink;
        ctx.globalAlpha = alpha;
        ctx.fillText(p.bit, x, y);
      }
    }
    ctx.globalAlpha = 1;
    if (!reduced && (!calm || animatingPose || wave || tearStart !== null)) queue();
  }

  function queue() {
    if (frame !== null || document.hidden) return;
    frame = requestAnimationFrame(time => {
      frame = null;
      const active = wave || tearStart !== null ||
        pose.some((value, index) => Math.abs(value - currentPose[index]) > .035);
      if (!motion.matches && time - lastDraw < (active ? 28 : 72)) return queue();
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
  observer.observe(canvas);
  observer.observe(avatar);
  observer.observe(artifact);
  root.addEventListener('pointerdown', event => {
    if (motion.matches || calm || !event.isPrimary ||
        artifact.contains(event.target) || event.target.closest('.experience,button,a,select,dialog')) return;
    const box = canvas.getBoundingClientRect();
    wave = { x: event.clientX - box.left, y: event.clientY - box.top, time: performance.now() };
    queue();
  });
  globalThis.addEventListener?.('scroll', refresh, {passive:true});
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
  motion.addEventListener('change', () => { tearStart = null; wave = undefined; queue(); });

  return ({ item = null, mood = 'confident', reaction } = {}) => {
    pose = poses[mood] ?? poses.confident;
    if (item !== itemId) {
      tearStart = motion.matches || item === null ? null : performance.now();
    } else if (reaction) tearStart = null;
    const layoutChanged = reaction === undefined || item !== itemId || !points.length;
    itemId = item;
    if (layoutChanged) refresh();
    else queue();
  };
}
