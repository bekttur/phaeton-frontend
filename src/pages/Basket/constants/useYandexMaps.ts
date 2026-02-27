import { useEffect, useState } from 'react';

declare global {
  interface Window {
    ymaps: any;
  }
}

export function useYandexMaps() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.ymaps) {
      window.ymaps.ready(() => setReady(true));
      return;
    }

    const script = document.createElement('script');
    script.src =
      'https://api-maps.yandex.ru/2.1/?apikey=c0e2e5d0-504d-4b70-8da5-0a2882d861d2&lang=ru_RU';
    script.async = true;

    script.onload = () => {
      window.ymaps.ready(() => setReady(true));
    };

    document.body.appendChild(script);
  }, []);

  return ready;
}
