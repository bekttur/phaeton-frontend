import { Search, Check } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { GlobalBottomSheet } from '../ui/GlobalBottomSheet/GlobalBottomSheet';
import { useRetailCity } from '../../hooks/useData';

export interface ICity {
  id: number;
  name: string;
  latLng: string;
  city1CGuid: string;
  alias?: string | null;
  ex?: any;
}

interface MobileCitySelectProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  onSelectTemp: (city: string) => void;
  onConfirm: (city: string) => void;
  onBackToConfirm: () => void;
}

const FAVORITES = ['Алматы', 'Астана', 'Шымкент', 'Актобе'];

const MobileCitySelect = ({
  isOpen,
  onClose,
  selectedCity,
  onSelectTemp,
  onConfirm,
  onBackToConfirm,
}: MobileCitySelectProps) => {
  const [query, setQuery] = useState('');
  const { data: cities, isLoading } = useRetailCity();
  const [allCities, setAllCities] = useState<ICity[]>([]);

  useEffect(() => {
    if (cities) {
      setAllCities(cities);
    }
  }, [cities]);

  const hasSelectedCity = Boolean(localStorage.getItem('fra:selected_city'));

  const filteredFavorites = useMemo(() => {
    if (!query.trim()) return FAVORITES;
    return FAVORITES.filter((c) =>
      c.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  const filteredRemaining = useMemo(() => {
    const remaining = allCities
      .map((c) => c.name)
      .filter((c) => !FAVORITES.includes(c));

    const filtered = remaining.filter((city) =>
      city.toLowerCase().includes(query.toLowerCase()),
    );

    return filtered.sort((a, b) => a.localeCompare(b, 'ru'));
  }, [allCities, query]);

  const grouped = useMemo(() => {
    if (query.trim()) {
      return { all: filteredRemaining };
    }
    return filteredRemaining.reduce((acc: Record<string, string[]>, city) => {
      const letter = city[0].toUpperCase();
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(city);
      return acc;
    }, {});
  }, [filteredRemaining, query]);

  return (
    <GlobalBottomSheet
      isOpen={isOpen}
      onClose={hasSelectedCity ? onClose : () => {}}
    >
      {/* Header */}
      <div className='sticky top-0 z-10 py-4 flex flex-col gap-5 bg-[#F6F6F6]'>
        <div className='flex items-center justify-start gap-4'>
          {!hasSelectedCity && (
            <button onClick={onBackToConfirm}>
              <img src='/icon/arrow_back.svg' alt='arrow_back' />
            </button>
          )}

          <h2 className='text-lg font-semibold text-gray-900'>Выбор города</h2>
        </div>

        {/* search */}
        <div className='relative'>
          <Search
            className='absolute left-3 top-1/2 -translate-y-1/2'
            width={18}
            height={18}
            color='#AEAEB2'
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Поиск вашего города'
            className='w-full h-[42px] pl-10 pr-3 bg-[#EAECED] rounded-[10px] text-base focus:outline-none'
          />
        </div>
      </div>

      <div
        className='overflow-y-auto pb-16 pt-3 flex flex-col gap-5'
        style={{ maxHeight: '70vh' }}
      >
        {isLoading && (
          <div className='text-center py-10'>Загрузка городов...</div>
        )}

        {/* top */}
        {!query && !!filteredFavorites.length && (
          <div className='space-y-1 bg-[#FFFFFF] p-3 rounded-xl'>
            {filteredFavorites.map((city) => (
              <button
                key={city}
                onClick={() => onSelectTemp(city)}
                className='w-full flex items-center justify-between px-2 py-3 border-b last:border-none'
              >
                <div
                  className={`text-base ${
                    selectedCity === city
                      ? 'text-[#4EBC73] font-medium'
                      : 'text-gray-900'
                  }`}
                >
                  {city}
                </div>
                {selectedCity === city && (
                  <Check width={18} height={18} color='#4EBC73' />
                )}
              </button>
            ))}
          </div>
        )}

        {/* alphabet groups */}
        {Object.keys(grouped).map((letter) => (
          <div key={letter} className='mt-2 bg-[#FFFFFF] p-3 rounded-xl'>
            {!query && (
              <div className='text-sm px-2 py-2 font-semibold text-gray-500 mb-1'>
                {letter}
              </div>
            )}
            {grouped[letter].map((city: string) => (
              <button
                key={city}
                onClick={() => onSelectTemp(city)}
                className='w-full text-left px-2 py-3 border-b last:border-none flex items-center justify-between'
              >
                <div
                  className={`text-base ${
                    selectedCity === city
                      ? 'text-[#4EBC73] font-medium'
                      : 'text-gray-900'
                  }`}
                >
                  {city}
                </div>
                {selectedCity === city && (
                  <Check width={18} height={18} color='#4EBC73' />
                )}
              </button>
            ))}
          </div>
        ))}
      </div>

      {selectedCity && (
        <div className='absolute bottom-5 left-0 w-full px-4'>
          <button
            onClick={() => onConfirm(selectedCity)}
            className='w-full h-12 rounded-xl bg-[#4EBC73] text-white text-base font-semibold'
          >
            Выбрать
          </button>
        </div>
      )}
    </GlobalBottomSheet>
  );
};

export default MobileCitySelect;
