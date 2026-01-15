import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';
import MobileCitySelect from './MobileCitySelect';
import { useCity } from '../../context/CityContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { city, setCity } = useCity();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCitySelectOpen, setIsCitySelectOpen] = useState(false);
  const [tempCity, setTempCity] = useState<string | null>(null);

  useEffect(() => {
    if (!city) {
      setIsCitySelectOpen(true);
    }
  }, [city]);

  return (
    <>
      <div className='lg:hidden fixed top-0 left-0 right-0 z-40 bg-white'>
        <div className='w-full min-h-14 flex items-center justify-between px-4'>
          <Link to={'/'} className='text-xl font-semibold text-[#62C382]'>
            Phaeton
          </Link>

          <div className='flex items-center gap-3'>
            <button
              onClick={() => setIsCitySelectOpen(true)}
              className='rounded-[10px] py-2 px-2.5 bg-[#DEF2E3] flex items-center gap-2'
            >
              <img src='/icon/mobile-menu/location_on.svg' width={16} />

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
