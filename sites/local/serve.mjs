import { createServer } from 'node:http';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import { createLocalDatabase } from './database.mjs';

process.chdir(fileURLToPath(new URL('../', import.meta.url)));
await import('../build.mjs');
const { default: worker } = await import('../dist/server/index.js');
const DB = createLocalDatabase();
const host = process.env.HOST ?? '127.0.0.1';
const port = Number(process.env.PORT ?? 4173);

const server = createServer(async (incoming, outgoing) => {
  try {
    const options = { method: incoming.method, headers: incoming.headers };
    if (incoming.method !== 'GET' && incoming.method !== 'HEAD') {
      options.body = Readable.toWeb(incoming);
      options.duplex = 'half';
    }
    const request = new Request('http://localhost' + incoming.url, options);
    const response = await worker.fetch(request, { DB });
    outgoing.writeHead(response.status, Object.fromEntries(response.headers));
    if (response.body) await pipeline(Readable.fromWeb(response.body), outgoing);
    else outgoing.end();
  } catch (error) {
    if (outgoing.destroyed) return;
    console.error(error.message);
    if (outgoing.headersSent) outgoing.destroy();
    else {
      outgoing.writeHead(500);
      outgoing.end('Local preview failed');
    }
  }
});
server.on('close', () => DB.close());
server.listen(port, host, () => console.log('GiftU preview on ' + host + ':' + server.address().port));
