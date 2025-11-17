import { ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';
import MobileCarSelect from './MobileCarSelect'; // импортируем наш компонент

const QuickSearchTabs = () => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'vin' | 'model'>(
    'catalog'
  );

  // состояние для открытия модального выбора машины
  const [isCarSelectOpen, setIsCarSelectOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState({
    brand: '',
    model: '',
    year: '',
    modification: '',
  });

  return (
    <div className='lg:hidden w-full px-2 mb-3'>
      <fieldset className='w-full flex items-center gap-2 bg-[#EAECED] p-[3px] rounded-[10px]'>
        {['catalog', 'vin', 'model'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-2 rounded-md text-base font-medium transition ${
              activeTab === tab
                ? 'bg-[#FFFFFF] text-[#000] border-[#FFFFFF]'
                : ' text-[#858588]'
            }`}
          >
            {tab === 'catalog' ? 'Каталог' : tab === 'vin' ? 'VIN' : 'Модель'}
          </button>
        ))}
      </fieldset>

      {activeTab !== 'model' ? (
        <div className='relative mt-3'>
          <input
            type='text'
            placeholder={
              activeTab === 'catalog'
                ? 'Поиск запчастей, например «фильтр»'
                : 'Введите ваш VIN'
            }
            className='w-full h-[42px] pl-10 pr-4 bg-[#EAECED] rounded-md text-base focus:outline-none focus:border-[#62C382]'
          />
          <Search
            className='absolute left-3 top-1/2 -translate-y-1/2'
            height='20'
            width='20'
            color='#AEAEB2'
          />
        </div>
      ) : (
        <div className='w-full mt-3 relative'>
          {/* имитация select */}
          <button
            onClick={() => setIsCarSelectOpen(true)}
            className='w-full h-[42px] px-3 bg-[#EAECED] rounded-md text-base text-left flex items-center justify-between'
          >
            {selectedCar.brand
              ? `${selectedCar.brand} ${selectedCar.model} ${selectedCar.year} ${selectedCar.modification}`
              : 'Выбрать марку'}
            <ChevronDown className='pointer-events-none' />
          </button>
        </div>
      )}

      {/* модальное окно выбора машины */}
      <MobileCarSelect
        isOpen={isCarSelectOpen}
        onClose={() => {
          setIsCarSelectOpen(false);
        }}
        onConfirm={(selection) => {
          setSelectedCar(selection);
          setIsCarSelectOpen(false);
        }}
      />
    </div>
  );
};

export default QuickSearchTabs;
