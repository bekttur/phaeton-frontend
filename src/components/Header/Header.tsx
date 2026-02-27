import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';
import MobileCitySelect from './MobileCitySelect';
import { ConfirmCitySheet } from './ConfirmCitySheet';
import { CookieConsentSheet } from './CookieConsentSheet';
import { useCity } from '../../context/CityContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { city, setCity } = useCity();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCitySelectOpen, setIsCitySelectOpen] = useState(false);
  const [isConfirmCityOpen, setIsConfirmCityOpen] = useState(false);
  const [isCookieOpen, setIsCookieOpen] = useState(false);
  const [tempCity, setTempCity] = useState<string | null>(null);

  const checkCookiesConsent = () => {
    const consent = localStorage.getItem('fra:cookie_consent');
    if (!consent) {
      setIsCookieOpen(true);
    }
  };

  useEffect(() => {
    if (!city) {
      setIsConfirmCityOpen(true);
    } else {
      checkCookiesConsent();
    }
  }, []);

  const handleConfirmAlmaty = () => {
    setCity('Алматы');
    setTempCity(null);
    setIsConfirmCityOpen(false);

    setTimeout(() => {
      checkCookiesConsent();
    }, 250);
  };

  const handleRejectCity = () => {
    setIsConfirmCityOpen(false);
    setIsCitySelectOpen(true);

    setTimeout(() => {
      checkCookiesConsent();
    }, 250);
  };

  const handleAcceptCookies = () => {
    localStorage.setItem('fra:cookie_consent', 'true');
    setIsCookieOpen(false);
  };

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

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenCitySelect={() => {
          setIsCitySelectOpen(true);
          setIsMenuOpen(false);
        }}
      />

      {/* city */}
      <ConfirmCitySheet
        isOpen={isConfirmCityOpen}
        city='Алматы'
        onYes={handleConfirmAlmaty}
        onNo={handleRejectCity}
      />

      {/* cookie */}
      <CookieConsentSheet
        isOpen={isCookieOpen}
        onAccept={handleAcceptCookies}
      />

      {/* city select */}
      <MobileCitySelect
        isOpen={isCitySelectOpen}
        onClose={() => setIsCitySelectOpen(false)}
        selectedCity={tempCity ?? city ?? ''}
        onSelectTemp={setTempCity}
        onConfirm={(city) => {
          setCity(city);
          setTempCity(null);
          setIsCitySelectOpen(false);

          setTimeout(() => {
            checkCookiesConsent();
          }, 250);
        }}
        onBackToConfirm={() => {
          setIsCitySelectOpen(false);
          setIsConfirmCityOpen(true);
        }}
      />
    </>
  );
};

export default Header;
