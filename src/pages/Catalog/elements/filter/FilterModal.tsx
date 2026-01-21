import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import FilterSelect from './FilterSelect';
import PriceRange from './PriceRange';

interface FilterModalProps {
  onClose: () => void;
}

type TabType = 'vin' | 'brand';

function FilterModal({ onClose }: FilterModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('brand');
  const [minPrice, setMinPrice] = useState(2500);
  const [maxPrice, setMaxPrice] = useState(30000);

  const handleApply = () => {
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-[#F7F7F7] z-50 flex flex-col'>
      <div className='flex items-center justify-between gap-4 px-4 py-4'>
        <button onClick={onClose} className='p-2 -ml-2'>
          <ArrowLeft className='w-6 h-6 text-[#8E8E93]' />
        </button>
        <h1 className='text-lg font-semibold'>Параметры поиска</h1>
		<div className='w-6 h-6' />
      </div>

      <div className='flex-1 overflow-y-auto'>
        <div className='px-4 py-3'>
          <div className='bg-white p-4 rounded-xl'>
            <div className='flex gap-2 mb-2.5 bg-[#EAECED] p-1 rounded-[10px]'>
              <button
                onClick={() => setActiveTab('vin')}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'vin'
                    ? 'bg-white text-black shadow-sm'
                    : 'bg-[#EAECED] text-[#636366]'
                }`}
              >
                VIN
              </button>
              <button
                onClick={() => setActiveTab('brand')}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'brand'
                    ? 'bg-white text-black shadow-sm'
                    : 'bg-[#EAECED] text-[#636366]'
                }`}
              >
                Марка
              </button>
            </div>

            {activeTab === 'vin' ? (
              <div className='space-y-2'>
                <div>
                  <label className='block text-sm font-medium text-[#636366] mb-2'>
                    VIN
                  </label>
                  <div className='flex items-center gap-3 px-4 py-3 bg-[#EAECED] rounded-[10px]'>
                    <svg
                      className='w-6 h-6 text-[#8C8C8C]'
                      viewBox='0 0 24 24'
                      fill='none'
                    >
                      <path
                        d='M19 17H5C3.89543 17 3 16.1046 3 15V9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9V15C21 16.1046 20.1046 17 19 17Z'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                    </svg>
                    <input
                      type='text'
                      placeholder='Введите ваш VIN-код'
                      className='flex-1 bg-transparent border-none outline-none text-black placeholder:text-[#8C8C8C]'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-[#636366] mb-2'>
                    Марка модель
                  </label>
                  <div className='px-4 py-3 bg-[#EAECED] rounded-[10px] text-[#8C8C8C]'>
                    Определим после ввода VIN-кода
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <label className='block text-sm font-medium text-[#636366] mb-2'>
                      Марка модель
                    </label>
                    <div className='px-4 py-3 bg-[#EAECED] rounded-[10px] text-[#8C8C8C]'>
                      Модель
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-[#636366] mb-2'>
                      Марка модель
                    </label>
                    <div className='px-4 py-3 bg-[#EAECED] rounded-[10px] text-[#8C8C8C]'>
                      Выберите
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className='space-y-2'>
                <div>
                  <label className='block text-sm font-medium text-[#636366] mb-2'>
                    Марка модель
                  </label>
                  <FilterSelect
                    value='Выберите марку'
                    options={['Toyota', 'BMW', 'Mercedes', 'Audi']}
                  />
                </div>

                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <label className='block text-sm font-medium text-[#636366] mb-2'>
                      Модель
                    </label>
                    <FilterSelect value='Модель' options={[]} />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-[#636366] mb-2'>
                      Модификация
                    </label>
                    <FilterSelect value='Выберите' options={[]} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='mt-4 space-y-2 bg-white p-4 rounded-xl'>
            <h3 className='text-sm font-medium text-[#636366]'>Запчасть</h3>
            <FilterSelect
              value='Автозапчасти'
              options={['Автозапчасти', 'Другое']}
            />
            <FilterSelect
              value='Тормозная система'
              options={['Тормозная система', 'Другое']}
            />
            <FilterSelect
              value='Тормозные диски'
              options={['Тормозные диски', 'Другое']}
            />
          </div>

          <div className='mt-4 bg-white p-4 rounded-xl'>
            <div className='space-y-2'>
              <h3 className='text-sm font-medium text-[#636366]'>Бренд</h3>
              <FilterSelect
                value='Любой'
                options={['Любой', 'Bosch', 'Brembo']}
              />
            </div>

            <div className='mt-2 space-y-2'>
              <h3 className='text-sm font-medium text-[#636366]'>Вид</h3>
              <FilterSelect value='Все' options={['Все', 'Новое', 'Б/У']} />
            </div>

            <div className='mt-2 space-y-2'>
              <h3 className='text-sm font-medium text-[#636366]'>
                Передние / Задние
              </h3>
              <FilterSelect
                value='Все'
                options={['Все', 'Передние', 'Задние']}
              />
            </div>
          </div>

          <div className='mt-4 bg-white p-4 rounded-xl space-y-2'>
            <h3 className='text-sm font-medium text-[#636366]'>Цена</h3>
            <PriceRange
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinChange={setMinPrice}
              onMaxChange={setMaxPrice}
            />
          </div>

          <div className='h-12'></div>
        </div>
      </div>

      <div className='px-4 pt-2 pb-4'>
        <button
          onClick={handleApply}
          className='w-full bg-[#4EBC73] text-white font-semibold py-1 rounded-[10px] transition-colors'
        >
          <div>Применить</div>
          <div className='text-sm font-normal'>240 товаров</div>
        </button>
      </div>
    </div>
  );
}

export default FilterModal;
