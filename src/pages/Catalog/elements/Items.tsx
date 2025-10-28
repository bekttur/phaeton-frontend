import { useParams } from 'react-router-dom';
import Breadcrumb from '../../../components/ui/Breadcrumb/Breadcrumb';
import { catalog_data } from '../elements/catalog.data';
import { AccordionItem } from '../../../components/ui/AccordionItem/AccordionItem';
import { AccordionSubItem } from '../../../components/ui/AccordionItem/AccordionSubItem';
import { useState } from 'react';
import VinWindow from './VinWindow';

const Items = () => {
  const { id } = useParams<{ id: string }>();
  const currentItem = catalog_data.find((item) => item.id === Number(id));
  const [isVinOpen, setIsVinOpen] = useState(false);

  const handleOpenVin = () => setIsVinOpen(true);
  const handleCloseVin = () => setIsVinOpen(false);

  return (
    <div className="px-2 relative bg-[#F6F6F6]">
      <Breadcrumb
        items={[
          { title: 'Главная', href: '/' },
          { title: 'Каталог товаров', href: '/catalog' },
          { title: currentItem ? currentItem.title : 'Загрузка...' },
        ]}
      />

      <h1 className="text-2xl font-semibold" style={{ lineHeight: 3 }}>
        Каталог товаров
      </h1>

      {currentItem?.accordions ? (
        <div className="mb-3">
          <div className="max-w-3xl mx-auto space-y-3">
            {currentItem.accordions.map((acc, idx) => (
              <AccordionItem
                key={idx}
                title={acc.title}
                defaultOpen={false}
              >
                {acc.subItems &&
                  acc.subItems.map((sub, i) => (
                    <AccordionSubItem
                      key={i}
                      title={sub}
                      onClick={handleOpenVin}
                    />
                  ))}
              </AccordionItem>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mt-6">Нет доступных подразделов.</p>
      )}

      {isVinOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-lg">
            <VinWindow handleCloseVin={handleCloseVin} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Items;
