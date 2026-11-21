import { mkdirSync, readdirSync, readFileSync, writeFileSync, cpSync } from 'node:fs';
mkdirSync('dist/server', { recursive: true });
const assets = Object.fromEntries(readdirSync('web').map(name => [
  '/' + name, readFileSync('web/' + name).toString('base64'),
]));
writeFileSync('dist/server/assets.js', 'export default ' + JSON.stringify(assets));
cpSync('worker.mjs', 'dist/server/index.js');
