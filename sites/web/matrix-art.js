// Shapes only select cells. The renderer draws glyphs, never these paths.
const scoop = [
  [9,53],[9,47],[13,38],[19,31],[26,26],[33,24],[40,24],[47,27],[53,33],
  [57,40],[60,48],[64,53],[70,56],[72,60],[68,62],[63,62],[58,60],[53,63],
  [46,64],[41,65],[34,63],[28,63],[22,61],[17,62],[13,59],
];
const cone = [
  [17,59],[24,61],[33,65],[41,65],[49,62],[53,61],[47,73],[40,84],
  [33,95],[25,104],[22,98],[20,90],[18,79],
];
const drips = [
  [[55,58],[62,58],[65,60],[64,68],[65,75],[64,85],[62,90],[60,83],[60,76],[58,70],[58,66]],
  [[48,62],[54,61],[55,65],[53,70],[54,75],[52,79],[50,76],[50,69]],
  [[66,60],[70,59],[71,63],[70,69],[68,72],[67,68]],
  [[60,95],[65,94],[68,96],[72,97],[67,100],[61,99],[58,98]],
];
const eyes = [
  [[23,45],[26,43],[29,43],[32,44]],
  [[44,43.5],[47,41.5],[50,41.5],[53,42.5]],
];

export const poses = {
  confident: [12, 4.7, -3.1, 0],
  boast: [13, 5.8, -2.5, 2.1],
  sorry: [10, -5.5, .8, 0],
  puzzled: [4.4, 0, 0, 3.7],
  tired: [8, -1.3, 1, 1.1],
};

export const palette = ['#bc450f', '#cb1654', '#a11671', '#7621a4', '#3747b6', '#2457b2', '#08776f', '#926019', '#32142f'];
const glyphKeys = ['0', '1'];

export function cellNoise(col, row, offset = 0) {
  let n = Math.imul(col + 1031, 0x9e3779b1) ^ Math.imul(row + 821, 0x85ebca77) ^ Math.imul(offset, 0xc2b2ae3d);
  n = Math.imul(n ^ n >>> 16, 0x7feb352d);
  n = Math.imul(n ^ n >>> 15, 0x846ca68b);
  return ((n ^ n >>> 16) >>> 0) / 4294967296;
}

const cap = number => Math.max(0, Math.min(1, number));

function segmentDistance(x, y, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const portion = cap(((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy));
  return Math.hypot(x - ax - dx * portion, y - ay - dy * portion);
}

function polygonDistance(x, y, points) {
  let inside = false;
  let gap = Infinity;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [ax, ay] = points[j];
    const [bx, by] = points[i];
    if ((ay > y) !== (by > y) && x < (bx - ax) * (y - ay) / (by - ay) + ax) inside = !inside;
    gap = Math.min(gap, segmentDistance(x, y, ax, ay, bx, by));
  }
  return inside ? gap : -gap;
}

export function botCell(x, y, edge, noise) {
  const scoopDistance = polygonDistance(x, y, scoop);
  const coneDistance = polygonDistance(x, y, cone);
  const dripDistance = Math.max(...drips.map(drip => polygonDistance(x, y, drip)));
  const nearest = Math.max(scoopDistance, coneDistance, dripDistance);
  let strength = cap(.5 + nearest / edge + (noise - .5) * .18);
  strength = strength * strength * (3 - 2 * strength);
  const wink = eyes.some(([[ax, ay], [bx, by], [cx, cy], [dx, dy]]) =>
    Math.min(segmentDistance(x, y, ax, ay, bx, by), segmentDistance(x, y, bx, by, cx, cy),
      segmentDistance(x, y, cx, cy, dx, dy)) < Math.max(1.35, edge * .23));
  if (wink) strength *= .08;
  const joint = 64 - .009 * (x - 35) ** 2;
  const warmCone = y > joint && x < 50 && coneDistance > dripDistance;
  if (warmCone && y - joint < 1.5) strength *= .76;
  const ink = warmCone ? (noise < .68 ? 0 : 1) :
    Math.max(0, Math.min(5, Math.floor((x - 10 + (noise - .5) * 13) / 10)));
  return { strength, ink };
}

export function mouthCell(x, y, pose, thickness) {
  const [width, curve, tilt, opening] = pose;
  const u = (x - 38) / width;
  if (Math.abs(u) > 1) return false;
  const across = 1 - u * u;
  const center = 51 + curve * across + tilt * u;
  const offset = Math.abs(y - center);
  return Math.abs(offset - opening * Math.sqrt(across)) <= thickness;
}

export function digitFor(seed) {
  return glyphKeys[seed < .5 ? 0 : 1];
}
