'use strict';

// CODELAB: Update cache names any time any of the cached files change.
//const CACHE_NAME = 'static-cache-v1';
const CACHE_NAME = 'static-cache-v4';
const DATA_CACHE_NAME = 'data-cache-v4';

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/scripts/install.js',
  '/styles/css.css',
  '/images/logo_200x46.png',
  '/images/sensor-de-umidade1280x720.jpg',
  '/images/controle-biologico1280x720.jpg',
  '/images/agrofloresta1280x720.png',
  '/images/horta-vertical1280x720.jpg',
  '/projetos.html',
  '/home.html',
  '/images/FloraMonitor1280x720.jpg',
  '/FloraMonitor.html'
];

	

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
);
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  //Clear old data.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);

  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  // Fetch event handler here.
  if (evt.request.url.includes('/forecast/')) {
  console.log('[Service Worker] Fetch (data)', evt.request.url);
  evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
            .then((response) => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              return response;
            }).catch((err) => {
              // Network request failed, try to get it from the cache.
              return cache.match(evt.request);
            });
      }));
  return;
}
evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
          .then((response) => {
            return response || fetch(evt.request);
          });
    })
);
  if (evt.request.mode !== 'navigate') {
  // Not a page navigation, bail.
  return;
}

});


