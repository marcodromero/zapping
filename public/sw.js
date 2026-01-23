const cacheName = 'mi-pwa-cache-v1';
const staticAssets = [
  '/',
  '/index.html',
  '/poster-192x92.png',
  '/poster-512x512.png',
  '/poster.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        return cache.addAll(staticAssets);
      })
      .catch((err) => {
        console.error(err);
      }),
  );
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  if (
    url.includes('.m3u8') ||
    url.includes('.ts') ||
    url.includes('.m4s') ||
    url.includes('.aac') ||
    url.includes('.mp4')
  ) {
    return event.respondWith(fetch(event.request));
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (event.request.mode === 'navigate') {
        return caches.match('/index.html').then((indexCacheResponse) => {
          if (indexCacheResponse) {
            return indexCacheResponse;
          }
          return fetch(event.request);
        });
      }

      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          const responseToCache = networkResponse.clone();

          if (
            networkResponse &&
            networkResponse.status === 200 &&
            event.request.method === 'GET'
          ) {
            caches.open(cacheName).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }

          return networkResponse;
        })
        .catch(() => {
          console.log('Fallo de red para:', event.request.url);
        });
    }),
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [cacheName];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((currentCacheName) => {
          if (!cacheWhitelist.includes(currentCacheName)) {
            return caches.delete(currentCacheName);
          }
        }),
      );
    }),
  );
});
