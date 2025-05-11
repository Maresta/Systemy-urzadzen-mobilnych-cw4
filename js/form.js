document.getElementById('weather-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = document.getElementById('city').value;
    const apiKey = document.getElementById('key').value;
  
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pl`
      );
      const data = await response.json();
      const date = new Date();
      const forecast = {
        id: city + '_' + Date.now(),
        city,
        date,
        data
      };
      saveForecast(forecast);
      alert('Dane zapisane!');
    } catch (err) {
      console.error('Błąd pobierania danych pogodowych:', err);
      alert('Nie udało się pobrać danych.');
    }
  });