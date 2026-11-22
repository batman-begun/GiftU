import {botCell, cellNoise, digitFor, mouthCell, palette, poses} from './matrix-art.js';

const STEP = 5;
export const TEAR_MS = 640;
const WAVE_MS = 1200;
export const IMPACT_MS = 460;
export const SINK_MS = 700;
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
  let wave, drain;
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
        const art = insideBotBox ? botCell(bx, by, Math.max(2.7, STEP / botScale * 1.65), cellNoise(col, row, 1)) : null;
        const iy = tearRadius ? (y - itemY) / tearRadius : 0;
        const seam = (x - itemX) - tearRadius * (.24 * iy + .08 * Math.sin(iy * 19));
        const byItem = itemId !== null && Math.abs(iy) < 1 && Math.abs(seam) < tearRadius;
        if (v >= .54 && !art?.strength && !byItem) continue;
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
    const breath = reduced || calm ? 0 : Math.sin(time / 950);
    if (drain && (reduced || time - drain.time >= SINK_MS)) drain = undefined;
    const drainage = drain ? Math.sin(Math.PI * (time - drain.time) / SINK_MS) : 0;
    const waveAge = wave ? Math.max(0, time - wave.time) : 0;
    const radius = waveAge * .48;
    const energy = wave ? 1 - waveAge / WAVE_MS : 0;
    const animatingPose = pose.some((value, i) => Math.abs(value - currentPose[i]) > .035);
    ctx.clearRect(0, 0, width, height);
    ctx.font = '6.5px monospace';
    const mouthThickness = Math.max(1.05, STEP / botScale * .84);
    const mouthMargin = STEP / botScale * .95;
    for (const p of points) {
      let ink = p.ink;
      let alpha = p.v < .54 ? (calm ? .17 : .27 + breath * .055) : 0;
      let x = p.x, y = p.y;
      if (p.art?.strength && p.v < .18 + p.art.strength * 1.18) {
        ink = palette[p.art.ink];
        alpha = Math.min(1, .25 + p.art.strength * (.80 + breath * .055));

      }
      if (p.nearMouth) {
        if (mouthCell(p.bx, p.by, currentPose, mouthThickness)) {
          ink = palette[8];
          alpha = 1;
        } else if (mouthCell(p.bx, p.by, currentPose, mouthThickness + mouthMargin)) {
          alpha *= .34;
        }
      }
      if (p.art?.strength) {
        x += (p.bx - 40) / 30 * breath * 1.9 * p.art.strength;
        y -= breath * 1.5 * p.art.strength;
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
      if (drainage && p.byItem && !p.art?.strength) {
        const dx = p.x - drain.x;
        const dy = p.y - drain.y;
        const pull = drainage * Math.max(0, 1 - Math.hypot(dx, dy) / (p.tearRadius * 1.25));
        x += (-dx * .7 - dy * .85) * pull;
        y += (-dy * .7 + dx * .85 + 42) * pull;
        if (pull > .04) {
          ink = palette[8];
          alpha = Math.max(alpha, pull * 1.8);
        }
      }
      if (waveAge > 0 && alpha && p.shadeFactor > .42) {
        const dx = p.x - wave.x;
        const dy = p.y - wave.y;
        const distance = Math.hypot(dx, dy);
        const offset = distance - radius;
        const band = Math.max(0, 1 - Math.abs(offset) / 54);
        const front = band * band * Math.cos(offset / 15);
        const indent = Math.max(0, 1 - distance / 54) * Math.max(0, 1 - radius / 102);
        alpha = Math.min(1, alpha + .70 * energy * Math.max(0, front)) * (1 - .73 * indent);
        const shift = front * energy * 18 / Math.max(1, distance);
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
    if (!reduced && (!calm || animatingPose || wave || drain || tearStart !== null)) queue();
  }

  function queue() {
    if (frame !== null || document.hidden) return;
    frame = requestAnimationFrame(time => {
      frame = null;
      const active = wave || drain || tearStart !== null ||
        pose.some((value, index) => Math.abs(value - currentPose[index]) > .035);
      if (!motion.matches && time - lastDraw < (active ? 25 : 48)) return queue();
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
        artifact.contains(event.target) || event.target.closest('button,a,select,dialog,input,textarea')) return;
    const box = canvas.getBoundingClientRect();
    wave = { x: event.clientX - box.left, y: event.clientY - box.top, time: performance.now() };
    queue();
  });
  globalThis.addEventListener?.('scroll', refresh, {passive:true});
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
  motion.addEventListener('change', () => { tearStart = null; wave = drain = undefined; queue(); });

  return ({ item = null, mood = 'confident', reaction } = {}) => {
    pose = poses[mood] ?? poses.confident;
    if (item !== itemId) {
      tearStart = motion.matches || item === null ? null : performance.now();
    } else if (reaction) {
      tearStart = null;
      if (!motion.matches && reaction === 'like') {
        wave = { x: width / 2, y: height / 2, time: performance.now() + 135 };
      }
      if (!motion.matches && reaction === 'no') {
        const box = artifact.getBoundingClientRect();
        drain = { x: box.left + box.width / 2, y: box.top + box.height / 2, time: performance.now() };
      }
    }
    const layoutChanged = reaction === undefined || item !== itemId || !points.length;
    itemId = item;
    if (layoutChanged) refresh();
    else queue();
  };
}
