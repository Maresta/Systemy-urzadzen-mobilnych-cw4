getAllForecasts((data) => {
    const container = document.getElementById('weather-data');
    let html = '';
    data.forEach(forecast => {
        html += `
            <div class="forecast">
                <h2>
                    ${forecast.city} (${forecast.date.toLocaleDateString('pl-PL', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    })})
                </h2>
        `;
        forecast.data.list.forEach(forecastDetail => {
            html += `
                    <h5>${forecastDetail.dt_txt}</h5>
                    <p>Temperatura: ${forecastDetail.main.temp} °C <br>
                    Pogoda: ${forecastDetail.weather[0].description}</p>
            `;
        });
        html += `
                </div>
            `;
    });
    container.innerHTML = html;
  });
  