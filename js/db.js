const dbPromise = indexedDB.open('WeatherDB', 1);

dbPromise.onupgradeneeded = event => {
  const db = event.target.result;
  const objectStore = db.createObjectStore('forecasts', { keyPath: 'id' });
  objectStore.createIndex("date", "date", { unique: false });
};

function saveForecast(data) {
  const req = indexedDB.open('WeatherDB', 1);
  req.onsuccess = () => {
    const db = req.result;
    const tx = db.transaction('forecasts', 'readwrite');
    const store = tx.objectStore('forecasts');
    store.add(data);
  };
}

function getAllForecasts(callback) {
    const req = indexedDB.open('WeatherDB', 1);
    req.onsuccess = () => {
        const db = req.result;
        const tx = db.transaction('forecasts', 'readonly');
        const store = tx.objectStore('forecasts');
        const index = store.index('date');
        const results = [];

        index.openCursor(null, 'prev').onsuccess = function(event) {
            const cursor = event.target.result;
            if (cursor) {
              results.push(cursor.value);
              cursor.continue();
            } else {
              callback(results);
            }
        };
    };
}