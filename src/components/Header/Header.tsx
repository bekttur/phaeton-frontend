import { useEffect, useState } from 'react';
import { Menu, MapPin } from 'lucide-react';
import MobileMenu from './MobileMenu';
import MobileCitySelect from './MobileCitySelect';
import { useCity } from '../../context/CityContext';

const Header = () => {
  const { city, setCity } = useCity();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCitySelectOpen, setIsCitySelectOpen] = useState(false);
  const [tempCity, setTempCity] = useState<string | null>(null);

  // 🔥 АВТООТКРЫТИЕ ПРИ ПЕРВОМ ЗАПУСКЕ
  useEffect(() => {
    if (!city) {
      setIsCitySelectOpen(true);
    }
  }, [city]);

  return (
    <>
      <div className='lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b'>
        <div className='w-full min-h-14 flex items-center justify-between px-4'>
          <span className='text-xl font-semibold text-[#62C382]'>Phaeton</span>

          <div className='flex items-center gap-3'>
            <button
              onClick={() => setIsCitySelectOpen(true)}
              className='rounded-[10px] py-2 px-2.5 bg-[#DEF2E3] flex items-center gap-1'
            >
              <MapPin width={24} height={24} color='#7ED399' />
              <span className='text-[15px] text-[#6ABF85] font-medium'>
                {city ?? 'Выберите город'}
              </span>
            </button>

            <button
              onClick={() => setIsMenuOpen(true)}
              className='rounded-[10px] py-2 px-2.5 bg-[#DEF2E3]'
            >
              <Menu width={24} height={24} color='#7ED399' />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <MobileCitySelect
        isOpen={isCitySelectOpen}
        onClose={() => setIsCitySelectOpen(false)}
        selectedCity={tempCity ?? city ?? ''}
        onSelectTemp={setTempCity}
        onConfirm={(city) => {
          setCity(city);
          setTempCity(null);
          setIsCitySelectOpen(false);
        }}
      />
    </>
  );
};

export default Header;
