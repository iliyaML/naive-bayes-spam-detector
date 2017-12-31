var CACHE_NAME = 'spamdetector-v1';
var urlsToCache = [
    '/',
    '/css/bootstrap.min.css',
    '/css/custom.css',
    '/img/icons/favicon.ico',
    '/manifest.json',
    '/img/icons/android-icon-36x36.png',
    '/img/icons/android-icon-48x48.png',
    '/img/icons/android-icon-72x72.png',
    '/img/icons/android-icon-96x96.png',
    '/img/icons/android-icon-144x144.png',
    '/img/icons/android-icon-192x192.png',
    '/sw.js'
];

// Install handler
self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch handler
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});