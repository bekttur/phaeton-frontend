import { X, Search, Check } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';

interface City {
  Id: number;
  Name: string;
  LatLng: string;
  City1CGuid: string;
  Alias?: string | null;
  ex?: any;
}

interface MobileCitySelectProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  onSelectTemp: (city: string) => void;
  onConfirm: (city: string) => void;
}

const FAVORITES = ['Алматы', 'Астана', 'Шымкент', 'Актобе'];
const MobileCitySelect = ({
  isOpen,
  onClose,
  selectedCity,
  onSelectTemp,
  onConfirm,
}: MobileCitySelectProps) => {
  const [query, setQuery] = useState('');
  const [allCities, setAllCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          'https://api.phaeton.kz/api/RetailCity?UserGuid=9A6DAC71-DC40-11F0-BBDB-BC97E1B23A0B&ApiKey=ihUOF5RTrO5wAHhQfbQW'
        );
        const data: City[] = await res.json();
        setAllCities(data);
      } catch (err) {
        console.error('Ошибка загрузки городов:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const filteredFavorites = useMemo(() => {
    if (!query.trim()) return FAVORITES;
    return FAVORITES.filter((c) =>
      c.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const filteredRemaining = useMemo(() => {
    const remaining = allCities
      .map(c => c.Name)
      .filter(c => !FAVORITES.includes(c));

    const filtered = remaining.filter((city) =>
      city.toLowerCase().includes(query.toLowerCase())
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
    <>
      {isOpen && (
        <div className='fixed inset-0 bg-black/30 z-[60]' onClick={onClose} />
      )}

      <div
        className={`fixed bottom-0 left-0 right-0 bg-[#F6F6F6] rounded-t-3xl z-[70] transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ minHeight: '85vh' }}
      >
        {/* Header */}
        <div className='sticky top-0 z-10 pb-3 px-4 pt-5 flex flex-col gap-5 bg-[#F6F6F6]'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-gray-900'>Выбор города</h2>
            <button
              onClick={onClose}
              className='w-6 h-6 flex items-center justify-center rounded-full bg-[#E3E6E8] hover:bg-gray-100'
            >
              <X width={16} height={16} color='#8C8C8C' />
            </button>
          </div>

          {/* Search */}
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
              className='w-full h-[42px] pl-10 pr-3 bg-[#EAECED] rounded-[10px] text-sm focus:outline-none'
            />
          </div>
        </div>

        {/* List */}
        <div className='overflow-y-auto px-4 pb-10 pt-5 flex flex-col gap-5' style={{ maxHeight: '70vh' }}>
          {loading && <div className='text-center py-10'>Загрузка городов...</div>}

          {/* Favorites */}
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
                      selectedCity === city ? 'text-[#4EBC73] font-medium' : 'text-gray-900'
                    }`}
                  >
                    {city}
                  </div>
                  {selectedCity === city && <Check width={18} height={18} color='#4EBC73' />}
                </button>
              ))}
            </div>
          )}

          {/* Alphabet groups */}
          {Object.keys(grouped).map((letter) => (
            <div key={letter} className='mb-3 mt-2 bg-[#FFFFFF] p-3 rounded-xl'>
              {!query && <div className='text-sm px-2 py-2 font-semibold text-gray-500 mb-1'>{letter}</div>}
              {grouped[letter].map((city: string) => (
                <button
                  key={city}
                  onClick={() => onSelectTemp(city)}
                  className='w-full text-left px-2 py-3 border-b last:border-none flex items-center justify-between'
                >
                  <div
                    className={`text-base ${
                      selectedCity === city ? 'text-[#4EBC73] font-medium' : 'text-gray-900'
                    }`}
                  >
                    {city}
                  </div>
                  {selectedCity === city && <Check width={18} height={18} color='#4EBC73' />}
                </button>
              ))}
            </div>
          ))}
        </div>

        {selectedCity && (
          <div className='absolute bottom-2 w-full px-4 pb-6'>
            <button
              onClick={() => onConfirm(selectedCity)}
              className='w-full h-12 rounded-xl bg-[#4EBC73] text-white text-base font-semibold'
            >
              Выбрать
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileCitySelect;
