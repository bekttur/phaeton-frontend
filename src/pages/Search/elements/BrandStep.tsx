import { useMemo, useState } from 'react';
import { useBrands } from '../../../hooks/useModel';
import { Search, X } from 'lucide-react';

interface Props {
  onSelect: (brand: any) => void;
  onClose: () => void;
}

const BrandStep = ({ onSelect, onClose }: Props) => {
  const [query, setQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<any | null>(null);

  const { data: brands, isLoading } = useBrands(true);

  const filteredBrands = useMemo(() => {
    if (!brands) return [];

    return brands
      .filter((b: any) => b.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a: any, b: any) => a.name.localeCompare(b.name, 'ru'));
  }, [brands, query]);

  const groupedBrands = useMemo(() => {
    return filteredBrands.reduce((acc: Record<string, any[]>, brand: any) => {
      const letter = brand.name[0].toUpperCase();
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(brand);
      return acc;
    }, {});
  }, [filteredBrands]);

  return (
    <>
      <div className='flex items-center justify-between mb-3'>
        <div />
        <h2 className='text-lg font-semibold'>Марка</h2>
        <button
          onClick={onClose}
          className='w-6 h-6 flex items-center justify-center rounded-full bg-[#E3E6E8] hover:bg-gray-100'
        >
          <X width={16} height={16} color='#8C8C8C' />
        </button>
      </div>

      <div className='relative mb-5'>
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

      {isLoading && <p>Загрузка...</p>}

      <div className='flex-1 overflow-y-auto mb-16'>
        {Object.keys(groupedBrands).map((letter) => (
          <div key={letter} className='mb-4 bg-white rounded-xl'>
            {!query && (
              <div className='text-base font-semibold text-gray-500 p-3 pb-0'>
                {letter}
              </div>
            )}

            <div className='overflow-hidden'>
              {groupedBrands[letter].map((brand: any) => {
                const checked = selectedBrand?.id === brand.id;

                return (
                  <button
                    key={brand.id}
                    onClick={() => setSelectedBrand(brand)}
                    className='w-full flex items-center justify-between px-3 py-5 border-b last:border-none'
                  >
                    <span className='text-base'>{brand.name}</span>

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
          onClick={() => selectedBrand && onSelect(selectedBrand)}
          disabled={!selectedBrand}
          className={`w-full py-3 rounded-xl text-white font-semibold ${
            selectedBrand ? 'bg-[#4EBC73]' : 'bg-gray-300'
          }`}
        >
          Выбрать
        </button>
      </div>
    </>
  );
};

export default BrandStep;
