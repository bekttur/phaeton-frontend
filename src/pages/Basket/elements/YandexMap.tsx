import { useEffect, useRef } from 'react';
import type { PickupPoint } from '../constants/pickupPoints';

declare global {
  interface Window {
    ymaps: any;
  }
}
export type SelectedAddress = {
  address: string;
  lat: string;
  lng: string;
};

type Props = {
  mode: 'click' | 'points' | 'confirm';
  points?: PickupPoint[];

  center?: [number, number];
  zoom?: number;
  height?: number
  bounds?: [[number, number], [number, number]];

  selectedPoint?: {
    address: string;
    lat: string;
    lng: string;
  };

  // click
  onAddressSelect?: (data: SelectedAddress) => void;

  // points
  onPointSelect?: (point: PickupPoint) => void;
};

export default function YandexMap({
  mode,
  points = [],
  center,
  zoom,
  height=600,
  bounds,
  selectedPoint,
  onAddressSelect,
  onPointSelect,
}: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const placemarkRef = useRef<any>(null);

  useEffect(() => {
    if (mapInstance.current) return;

    if (window.ymaps) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src =
        'https://api-maps.yandex.ru/2.1/?apikey=c0e2e5d0-504d-4b70-8da5-0a2882d861d2&lang=ru_RU';
      script.onload = initMap;
      document.body.appendChild(script);
    }
  }, []);

  const initMap = () => {
    window.ymaps.ready(() => {
      if (!mapRef.current || mapInstance.current) return;

      const map = new window.ymaps.Map(mapRef.current, {
        center: center ?? [43.238949, 76.889709],
        zoom: zoom ?? 12,
        controls: ['fullscreenControl', 'zoomControl'],
      });

      mapInstance.current = map;

      if (mode === 'click') {
        initClickMode(map);
      }

      if (mode === 'points') {
        initPointsMode(map);
      }

      if (mode === 'confirm') {
        initConfirmMode(map);
      }
    });
  };

  const initClickMode = (map: any) => {
    const searchControl = new window.ymaps.control.SearchControl({
      options: {
        noPlacemark: true,
        placeholderContent: 'Введите адрес',
        boundedBy: bounds,
        size: 'large',
        searchOnTyping: true,
      },
    });

    

    map.controls.add(searchControl);

    searchControl.events.add('resultselect', async (e: any) => {
      const index = e.get('index');
      const result = await searchControl.getResult(index);

      const coords = result.geometry.getCoordinates();
      const address = result.getAddressLine();

      setPlacemark(coords);
      map.setCenter(coords, 16);

      onAddressSelect?.({
        address,
        lat: coords[0],
        lng: coords[1],
      });
    });

    map.events.add('click', (e: any) => {
      const coords = e.get('coords');
      setPlacemark(coords);
      geocode(coords);
    });
  };

  const setPlacemark = (coords: number[]) => {
    if (!placemarkRef.current) {
      placemarkRef.current = new window.ymaps.Placemark(coords);
      mapInstance.current.geoObjects.add(placemarkRef.current);
    } else {
      placemarkRef.current.geometry.setCoordinates(coords);
    }
  };

  const geocode = (coords: number[]) => {
    window.ymaps.geocode(coords).then((res: any) => {
      const firstGeoObject = res.geoObjects.get(0);
      const address = firstGeoObject.getAddressLine();

      onAddressSelect?.({
        address,
        lat: String(coords[0]),
        lng: String(coords[1]),
      });
    });
  };

  const initPointsMode = (map: any) => {
    points.forEach((point) => {
      const placemark = new window.ymaps.Placemark(
        point.coords,
        {
          balloonContent: point.address,
        },
        {
          preset: 'islands#greenIcon',
        },
      );

      placemark.events.add('click', () => {
        onPointSelect?.(point);
      });

      map.geoObjects.add(placemark);
    });
  };

  const initConfirmMode = (map: any) => {
      if (selectedPoint) {
        const coords = [Number(selectedPoint.lat), Number(selectedPoint.lng)];

        setPlacemark(coords);
        map.setCenter(coords, 16);
      }

      map.events.add('click', (e: any) => {
        const coords = e.get('coords');

        setPlacemark(coords);

        window.ymaps.geocode(coords).then((res: any) => {
          const address = res.geoObjects.get(0).getAddressLine();

          onAddressSelect?.({
            address,
            lat: String(coords[0]),
            lng: String(coords[1]),
          });
        });
      });
    };

  useEffect(() => {
    if (mapInstance.current && center) {
      mapInstance.current.setCenter(center, zoom ?? 12, { duration: 300 });
    }
  }, [center, zoom]);

  return <div ref={mapRef} style={{ width: '100%', height: height }} />;
}
