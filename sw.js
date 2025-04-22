const cacheName = 'mi-pwa-cache-v1';
const staticAssets = [
	'/',
	'./index.html',
	'./index.css',
	'./index.js',
	'./poster-192x92.png',
	'./poster-512x512.png',
	'./poster.png',
];

self.addEventListener('install', async () => {
	const cache = await caches.open(cacheName);
	await cache.addAll(staticAssets);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});
