const CACHE = 'ruvo-v1';

// Assets to pre-cache on install
const PRECACHE = [
  '/',
  '/manifest.json',
  '/icon.png',
  '/Ruvo Logo Original.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first for HTML navigation; cache-first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  if (request.mode === 'navigate') {
    // Network-first: always try to get fresh HTML, fall back to cached '/'
    event.respondWith(
      fetch(request).catch(() => caches.match('/'))
    );
    return;
  }

  // Cache-first for JS/CSS/images/fonts
  if (['script', 'style', 'image', 'font'].includes(request.destination)) {
    event.respondWith(
      caches.match(request).then(
        (cached) => cached ?? fetch(request).then((res) => {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(request, clone));
          return res;
        })
      )
    );
  }
});
