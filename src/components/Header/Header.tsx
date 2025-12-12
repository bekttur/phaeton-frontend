import { useState } from 'react';
import { Menu, MapPin } from 'lucide-react';
import MobileMenu from './MobileMenu';
import MobileCitySelect from './MobileCitySelect';
import { useCity } from '../../context/CityContext';

const Header = () => {
  const { city: confirmedCity, setCity } = useCity();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCitySelectOpen, setIsCitySelectOpen] = useState(false);

  // const [confirmedCity, setConfirmedCity] = useState('Алматы');
  const [tempCity, setTempCity] = useState<string | null>(null);

  return (
    <>
      <div className='lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b'>
        <div className='w-full min-h-14 flex items-center justify-between px-4'>
          <span className='text-xl font-semibold text-[#62C382]'>Phaeton</span>

          <div className='flex items-center gap-3 justify-between'>
            <button
              onClick={() => setIsCitySelectOpen(true)}
              className='w-fit h-fit rounded-[10px] py-2 px-2.5 bg-[#DEF2E3] flex items-center justify-center gap-1'
            >
              <MapPin width={24} height={24} color='#7ED399' />
              <span className='text-[15px] text-[#6ABF85] mb-0.5 font-medium'>
                {confirmedCity}
              </span>
            </button>
            <button
              onClick={() => setIsMenuOpen(true)}
              className='w-fit h-fit rounded-[10px] py-2 px-2.5 bg-[#DEF2E3] flex items-center justify-center gap-1'
            >
              <Menu width={24} height={24} color='#7ED399' />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <MobileCitySelect
        isOpen={isCitySelectOpen}
        onClose={() => {
          setTempCity(null);
          setIsCitySelectOpen(false);
        }}
        selectedCity={tempCity ?? confirmedCity}
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
