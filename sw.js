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
			})
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			if (event.request.mode === 'navigate') {
				return caches.match('/index.html') || fetch(event.request);
			}

			if (cachedResponse) {
				return cachedResponse;
			}

			return fetch(event.request)
				.then((networkResponse) => {
					const responseToCache = networkResponse.clone();

					caches.open(cacheName).then((cache) => {
						cache.put(event.request, responseToCache);
					});

					return networkResponse;
				})
				.catch(() => {
					console.log('Fallo de red.');
				});
		})
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
				})
			);
		})
	);
});
