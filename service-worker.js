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

self.addEventListener('message', async (event) => {
  if (event.data && event.data.type === 'GET_WEATHER') {
    const { city, apiKey } = event.data;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pl`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      event.source.postMessage({ type: 'WEATHER_SUCCESS', city, data });
    } catch (err) {
      event.source.postMessage({ type: 'WEATHER_ERROR' });
    }
  }
});

self.addEventListener('fetch', event => {
    event.respondWith(

        caches.match(event.request).then(function(response) {

            return response || fetch(event.request);

        })

    );
});