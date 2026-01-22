import { useMemo, useState } from 'react';
import { useSeries } from '../../../hooks/useModel';
import { ChevronLeft, Search, X } from 'lucide-react';

interface Props {
  brand: any;
  onBack: () => void;
  onConfirm: (series: any) => void;
  onClose: () => void;
}

const SeriesStep = ({ brand, onBack, onConfirm, onClose }: Props) => {
  const [query, setQuery] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<any | null>(null);

  const { data: series, isLoading } = useSeries(brand.id, true);

  const filteredSeries = useMemo(() => {
    if (!series) return [];

    return series
      .filter((s: any) => s.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a: any, b: any) => a.name.localeCompare(b.name, 'ru'));
  }, [series, query]);

  const groupedSeries = useMemo(() => {
    return filteredSeries.reduce((acc: Record<string, any[]>, item: any) => {
      const letter = item.name[0].toUpperCase();
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(item);
      return acc;
    }, {});
  }, [filteredSeries]);

  return (
    <>
      <div className='sticky top-0 z-10 py-4 flex flex-col gap-5 bg-[#F6F6F6]'>
        <div className='flex items-center justify-between'>
          <button onClick={onBack}>
            <ChevronLeft size={24} color='#8E8E93' />
          </button>

          <h2 className='text-lg font-semibold'>{brand.name}</h2>
          <button
            onClick={onClose}
            className='w-6 h-6 flex items-center justify-center rounded-full bg-[#E3E6E8] hover:bg-gray-100'
          >
            <X width={16} height={16} color='#8C8C8C' />
          </button>
        </div>

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
            placeholder='Поиск модели'
            className='w-full h-[42px] pl-10 pr-3 bg-[#EAECED] rounded-[10px] text-base focus:outline-none'
          />
        </div>
      </div>

      {isLoading && <p>Загрузка...</p>}

      <div className='flex-1 overflow-y-auto mb-16'>
        {Object.keys(groupedSeries).map((letter) => (
          <div key={letter} className='mb-4 bg-white rounded-xl'>
            {!query && (
              <div className='text-base font-semibold text-gray-500 p-3 pb-0'>
                {letter}
              </div>
            )}

            <div className='overflow-hidden'>
              {groupedSeries[letter].map((item: any) => {
                const checked = selectedSeries?.id === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSeries(item)}
                    className='w-full flex items-center justify-between px-3 py-5 border-b last:border-none'
                  >
                    <span className='text-base text-left'>{item.name}</span>

                    <span
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        checked ? 'border-[#4EBC73]' : 'border-gray-300'
                      }`}
                    >
                      {checked && (
                        <span className='w-2.5 h-2.5 rounded-full bg-[#4EBC73]' />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className='absolute bottom-5 left-0 w-full px-4'>
        <button
          onClick={() => selectedSeries && onConfirm(selectedSeries)}
          disabled={!selectedSeries}
          className={`w-full py-3 rounded-xl text-white font-semibold mt-2 ${
            selectedSeries ? 'bg-[#4EBC73]' : 'bg-gray-300'
          }`}
        >
          Выбрать
        </button>
      </div>
    </>
  );
};

export default SeriesStep;
