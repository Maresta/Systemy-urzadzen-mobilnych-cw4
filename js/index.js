if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('SW zarejestrowany', reg))
        .catch(err => console.error('Błąd przy rejestracji SW', err));
    });
  }