const prefix = 'giftu-shell-';
const version = prefix + '0.2.0';
const files = ['./','./index.html','./style.css','./app.js','./matrix.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e => {
  e.waitUntil(caches.open(version).then(cache=>cache.addAll(files.map(url=>new Request(url,{cache:'reload'})))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e => {
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(prefix)&&key!==version).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(()=>caches.open(version).then(cache=>cache.match('./index.html'))));
    return;
  }
  if (files.some(path=>new URL(path,self.registration.scope).href===url.href)) {
    e.respondWith(fetch(e.request).catch(()=>caches.open(version).then(cache=>cache.match(url.href))));
  }
});
