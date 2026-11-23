export const palette = ['#bc450f', '#cb1654', '#a11671', '#7621a4', '#3747b6', '#2457b2', '#08776f', '#926019', '#32142f'];
const glyphKeys = ['0', '1'];

export function cellNoise(col, row, offset = 0) {
  let n = Math.imul(col + 1031, 0x9e3779b1) ^ Math.imul(row + 821, 0x85ebca77) ^ Math.imul(offset, 0xc2b2ae3d);
  n = Math.imul(n ^ n >>> 16, 0x7feb352d);
  n = Math.imul(n ^ n >>> 15, 0x846ca68b);
  return ((n ^ n >>> 16) >>> 0) / 4294967296;
}

export function digitFor(seed) {
  return glyphKeys[seed < .5 ? 0 : 1];
}
