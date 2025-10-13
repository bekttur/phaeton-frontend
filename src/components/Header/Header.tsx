import { useState } from 'react';
import { Search, Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'vin' | 'model'>('catalog');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="w-full min-h-14 flex items-center justify-between px-2">
          <span className="text-xl font-semibold text-[#62C382]">Phaeton</span>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="w-fit h-fit rounded-md py-2.5 px-3 bg-[#DEF2E3] flex items-center justify-center"
          >
            <Menu width={24} height={24} color="#7ED399" />
          </button>
        </div>
      </div>

      <div className="w-full pt-16 px-2 pb-3">
        {activeTab !== 'model' ? (
          <div className="relative">
            <input
              type="text"
              placeholder={
                activeTab === 'catalog'
                  ? 'Поиск запчастей, например «фильтр»'
                  : 'Введите ваш VIN'
              }
              className="w-full h-10 pl-10 pr-4 border border-[#DDDDDD80] rounded-md text-sm focus:outline-none focus:border-[#62C382]"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" height="16" width="16" color="#4EBC73" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <select className="h-10 px-3 border border-[#DDDDDD80] rounded-md text-sm focus:outline-none focus:border-[#62C382]">
              <option value="toyota">Toyota</option>
              <option value="mitsubishi">Mitsubishi</option>
              <option value="audi">Audi</option>
            </select>

            <select className="h-10 px-3 border border-[#DDDDDD80] rounded-md text-sm focus:outline-none focus:border-[#62C382]">
              <option value="camry">Camry</option>
              <option value="outlander">Outlander</option>
              <option value="a6">A6</option>
            </select>
          </div>
        )}

        <fieldset className="w-full py-2 flex items-center gap-2">
          {['catalog', 'vin', 'model'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-2 rounded-md text-sm font-medium border transition ${
                activeTab === tab
                  ? 'bg-[#62C382] text-white border-[#62C382]'
                  : 'border-gray-300 text-gray-600'
              }`}
            >
              {tab === 'catalog'
                ? 'Каталог'
                : tab === 'vin'
                ? 'VIN'
                : 'Модель'}
            </button>
          ))}
        </fieldset>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
