const cacheName = 'mi-pwa-cache-v1';
const staticAssets = [
  '/',
  '/index.html',
  '/poster-192x92.png',
  '/poster-512x512.png',
  '/poster.png',
];

// 1. Instalación: Guardamos los archivos críticos
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Fuerza la activación inmediata del nuevo SW
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(staticAssets);
    }),
  );
});

// 2. Activación: Limpieza de caches antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        }),
      );
    }),
  );
});

// 3. Estrategia Network First
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Exclusión para transmisiones en vivo (HLS/Streaming)
  // Estos NUNCA deben ir al caché porque son flujos infinitos
  if (
    url.pathname.endsWith('.m3u8') ||
    url.pathname.endsWith('.ts') ||
    url.pathname.endsWith('.m4s') ||
    url.pathname.endsWith('.aac') ||
    url.pathname.endsWith('.mp4')
  ) {
    return event.respondWith(fetch(event.request));
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Si la red responde bien, guardamos/actualizamos el caché
        return caches.open(cacheName).then((cache) => {
          if (
            event.request.method === 'GET' &&
            networkResponse.status === 200
          ) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      })
      .catch(() => {
        // Si la red falla (estamos offline), buscamos en el caché
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Si es una navegación (entrar a una ruta) y no hay nada, devolvemos el index
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      }),
  );
});
