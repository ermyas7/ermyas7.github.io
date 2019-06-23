///////////////////////// cache storage
const cacheName = 'v2';
const cacheAssets = [
  '/',
  './index.html',
  '/js/main.js',
  '/css/icon-font.css',
  '/css/style.css',
  '/img'
];

////////////// call install event on sw

self.addEventListener('install', e => {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

/////// call activate event

self.addEventListener('activate', e => {
  console.log("Serviceworker Activated!");

  //////////////// remove unwanted old cache
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(
        cache => {
          if(cache!=cacheName){
            console.log('service worker clearing old cache');
            return caches.delete(cache);
          }
        }
      ) )
    })
  )
})


///////////////////////////////////////////////////////
///////// call fetch event when no connection/////////
self.addEventListener('fetch', e => {
  console.log('service worker fetching!');
  e.respondWith(fetch(e.request)
  .catch(() => caches.match(e.request)));
})

// self.addEventListener('fetch', e => {
//   console.log('Service Worker: Fetching');
//   e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
// });
