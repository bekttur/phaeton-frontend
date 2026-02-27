import { useEffect, useMemo, useState } from 'react';
import { useYandexMaps } from '../constants/useYandexMaps';
import { useCity } from '../../../context/CityContext';
import { useRetailCity } from '../../../hooks/useData';
import { GlobalBottomSheet } from '../../../components/ui/GlobalBottomSheet/GlobalBottomSheet';
import { Search } from 'lucide-react';

declare global {
  interface Window {
    ymaps: any;
  }
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (data: { address: string; lat: string; lng: string }) => void;
};

const parseLatLng = (latLng?: string): [number, number] | undefined => {
  if (!latLng) return undefined;
  const [lat, lng] = latLng.split(',').map(Number);
  return Number.isFinite(lat) && Number.isFinite(lng) ? [lat, lng] : undefined;
};

export default function SearchAddressModal({
  isOpen,
  onClose,
  onSelect,
}: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const ymapsReady = useYandexMaps();

  const { city } = useCity();
  const { data: cities } = useRetailCity();

  const cityCenter = useMemo(() => {
    if (!city || !cities) return undefined;

    const cityObj = cities.find((c: any) => c.name === city);
    return parseLatLng(cityObj?.latLng);
  }, [city, cities]);

  const cityBounds = useMemo(() => {
    if (!cityCenter) return undefined;

    const [lat, lng] = cityCenter;
    const delta = 0.25;

    return [
      [lat - delta, lng - delta],
      [lat + delta, lng + delta],
    ];
  }, [cityCenter]);

  useEffect(() => {
    if (!query || !ymapsReady || !cityBounds) return;

    const timer = setTimeout(() => {
      window.ymaps
        .geocode(`${city}, ${query}`, {
          results: 12,
          boundedBy: cityBounds,
          strictBounds: true,
          kind: 'house',
        })
        .then((res: any) => {
          const items = res.geoObjects.toArray();
          setResults(items);
        })
        .catch(() => setResults([]));
    }, 300);

    return () => clearTimeout(timer);
  }, [query, ymapsReady, cityBounds]);

  console.log(results);

  if (!isOpen) return null;

  if (!ymapsReady) {
    return (
      <div className='fixed inset-0 bg-white flex items-center justify-center'>
        Загрузка карты...
      </div>
    );
  }

  return (
    // <div className='fixed inset-0 bg-white z-[9999] p-4'>
    <GlobalBottomSheet isOpen={isOpen} onClose={onClose}>
      <div className='sticky top-0 z-10 py-4 flex flex-col bg-[#F6F6F6]'>
        <div className='flex items-center justify-start gap-4'>
          {/* <button onClick={() => {}}>
            <img src='/icon/arrow_back.svg' alt='arrow_back' />
          </button> */}

          <h2 className='text-lg font-semibold text-gray-900'>
            Улица и номер дома
          </h2>
        </div>
        <div className='flex-1 relative mt-3'>
          <Search className='w-5 h-5 text-[#AEAEB2] absolute left-3 top-1/2 -translate-y-1/2' />
          <input
            autoFocus
            placeholder='Введите адрес'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='w-full pl-10 pr-4 py-2 bg-[#EAECED] rounded-[10px] text-base focus:outline-none focus:border-[#62C382]'
          />
        </div>

        <div className='mt-4 space-y-1'>
          {results.map((item, i) => {
            const address = item.getAddressLine();
            const coords = item.geometry.getCoordinates();

            return (
              <div className='flex items-start p-3 gap-2 border-b border-b-gray-200'>
                <img src='icon/mobile-menu/location_on.svg' className='mt-0.5' />
                <button
                  key={i}
                  className='w-full text-left'
                  onClick={() =>
                    onSelect({
                      address,
                      lat: String(coords[0]),
                      lng: String(coords[1]),
                    })
                  }
                >
                  {address}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className='absolute bottom-5 left-0 w-full px-4'>
        <button
          className='w-full py-3 rounded-xl text-white font-semibold bg-gray-300'
          onClick={onClose}
        >
          Закрыть
        </button>
      </div>
    </GlobalBottomSheet>
  );
}
