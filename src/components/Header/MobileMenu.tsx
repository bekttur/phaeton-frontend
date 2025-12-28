import { X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: 'icon/mobile-menu/location_on.svg',
      title: 'Город',
      subtitle: 'Алматы',
    },
    {
      icon: 'icon/mobile-menu/language.svg',
      title: 'Язык',
      subtitle: 'Русский',
    },
    {
      icon: 'icon/shopping_cart.svg',
      title: 'Корзина',
    },
    {
      icon: 'icon/mobile-menu/bucket_check.svg',
      title: 'Мои заказы',
      href: '/my-orders',
    },
    {
      icon: 'icon/mobile-menu/favorite.svg',
      title: 'Избранное',
    },
    {
      icon: 'icon/mobile-menu/smart_toy.svg',
      title: 'AI-ассистент запчастей',
    },
    {
      icon: 'icon/mobile-menu/newsmode.svg',
      title: 'Новости',
    },
    {
      icon: 'icon/mobile-menu/headphones.svg',
      title: 'Контакты',
    },
    {
      icon: 'icon/mobile-menu/school.svg',
      title: 'Вопросы и ответы',
    },
  ];

  const handleNavigation = (href?: string) => {
    if (href) {
      navigate(href);
    }
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/30 z-[60] transition-opacity'
          onClick={onClose}
        />
      )}

      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[70] transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '90vh' }}
      >
        <div className='px-4 py-6'>
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-lg font-semibold text-gray-900'>Меню</h2>
            <button
              onClick={onClose}
              className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition'
            >
              <X width={24} height={24} color='#666' />
            </button>
          </div>

          <div className='space-y-1'>
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.href)}
                className='w-full flex items-center gap-4 px-2 py-2 rounded-xl hover:bg-gray-50 transition'
              >
                <div className='w-12 h-12 rounded-md bg-[#DEF2E3] flex items-center justify-center flex-shrink-0'>
                  <img
                    src={`${import.meta.env.BASE_URL}${item.icon}`}
                    width={22}
                    height={22}
                  />
                </div>

                <div className='flex-1 text-left'>
                  <div className='text-base font-medium text-gray-900'>
                    {item.title}
                  </div>
                  {item.subtitle && (
                    <div className='text-sm text-gray-500 mt-0.5'>
                      {item.subtitle}
                    </div>
                  )}
                </div>

                <ChevronRight
                  width={20}
                  height={20}
                  color='#CCC'
                  strokeWidth={2}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
