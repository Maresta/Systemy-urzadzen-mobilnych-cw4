document.getElementById('weather-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = document.getElementById('city').value;
  const apiKey = document.getElementById('key').value;;
  const date = new Date();

  if (!navigator.serviceWorker.controller) {
    alert('Service Worker nie jest aktywny');
    return;
  }

  navigator.serviceWorker.controller.postMessage({
    type: 'GET_WEATHER',
    city,
    apiKey
  });

  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data.type === 'WEATHER_SUCCESS') {
      const { city, data } = event.data;
      const forecast = { id: city + '_' + Date.now(), city, date, data };
      saveForecast(forecast);
      alert('Dane zapisane!');
    } else if (event.data.type === 'WEATHER_ERROR') {
      window.location.href = '/offline.html';
    }
  });
});