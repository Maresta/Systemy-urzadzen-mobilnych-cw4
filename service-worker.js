self.addEventListener('install', function(event) {

    event.waitUntil(

        caches.open('pwa-weather-v1').then(function(cache) {

            return cache.addAll([

                '/',
                '/index.html',
                '/form.html',
                '/weather.html',
                '/offline.html',
                '/js/db.js',
                '/js/form.js',
                '/js/app.js',
                '/js/index.js',
                '/icons/icon-192.png',
                '/icons/icon-512.png'

            ]);

        })

    );

});

self.addEventListener('fetch', event => {
  if (event.request.url.includes('api.openweathermap.org')) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          return res;
        })
        .catch(() => caches.match('/offline.html'))
    );
  } else {
    event.respondWith(

        caches.match(event.request).then(function(response) {

            return response || fetch(event.request);

        })

    );
  }
});