const CACHE_NAME = 'realnishil-portfolio-v1';

// Core shell assets — these get pre-cached on install so the desktop
// loads even on flaky connections or offline.
const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './images/wallpapers/wall-1.webp',
  './images/logos/profile.png',
  './themes/Yaru/status/cof_orange_hex.svg',
  './themes/Yaru/status/ubuntu_white_hex.svg',
  './themes/Yaru/status/process-working-symbolic.svg',
];

// Install: pre-cache the shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(SHELL_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: clear old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for shell assets, network-first for everything else
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET, cross-origin (GitHub API, EmailJS, etc.)
  if (event.request.method !== 'GET') return;
  if (url.origin !== location.origin) return;

  // Certificate PDFs: network-first (large, user expects fresh)
  if (url.pathname.includes('/files/certificates/')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // Everything else: cache-first with network fallback
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const toCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, toCache));
        return response;
      });
    })
  );
});
