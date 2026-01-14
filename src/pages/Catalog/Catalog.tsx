import { Link, useLocation } from 'react-router-dom';
import { catalog_data } from './elements/catalog.data';
import QuickSearchTabs from './elements/QuickSearchTabs';
import { useTreeVehicleByKType } from '../../hooks/useModel';
import { useState } from 'react';
import CategoryModal from './elements/CategoryModal';
import VehicleBlock from './elements/VehicleBlock';

const Catalog = () => {
  const location = useLocation();
  const { pathname } = location;
  const [activeCategory, setActiveCategory] = useState<any | null>(null);

  const vehicle = location.state?.vehicle;
  const ktype = location.state?.ktype;

  const { data: treeData } = useTreeVehicleByKType(ktype?.ktype);

  const rootCategories = treeData?.filter(
    (item: any) => item.parentId === null
  );

  const showAll = pathname === '/catalog';
  const items = showAll ? catalog_data : catalog_data.slice(0, 6);

  return (
    <div
      style={{ paddingTop: showAll ? '70px' : '0px' }}
      className={`block lg:hidden bg-[#F6F6F6]  ${showAll && 'min-h-screen'}`}
    >
      {!!showAll && <QuickSearchTabs />}
      <div className='w-full px-4 mb-4'>
        {!!showAll && vehicle && <VehicleBlock vehicle={vehicle} />}
      </div>

      <div className='px-4 bg-[#F6F6F6] mb-3'>
        <div className='grid grid-cols-3 gap-[13px]'>
          {(vehicle && rootCategories ? rootCategories : items).map(
            (item: any) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.children > 0) {
                    setActiveCategory(item);
                  }
                }}
                className='aspect-square bg-[#FDFDFD] border border-[#E9EBEE]
                 rounded-[10px] px-2 py-1 text-left'
              >
                <div className='flex flex-col justify-between h-full'>
                  <span className='text-sm font-medium text-[#56625A]'>
                    {item.name || item.title}
                  </span>

                  {item.children > 0 && (
                    <span className='text-xs text-[#9A9A9A]'>
                      {item.children} разделов
                    </span>
                  )}
                </div>
              </button>
            )
          )}
        </div>

        {pathname === '/' && (
          <div className='mt-4 flex justify-center'>
            <Link
              to='/catalog'
              className='w-full text-center py-3 bg-[#EAECED] text-[#636366] rounded-xl text-base font-semibold'
            >
              Открыть каталог
            </Link>
          </div>
        )}

        {activeCategory && (
          <CategoryModal
            isOpen={!!activeCategory}
            category={activeCategory}
            treeData={treeData || []}
            ktype={ktype?.ktype}
            vehicle={vehicle}
            onClose={() => setActiveCategory(null)}
            onSelectLeaf={({ ktype, categoryId }) => {
              console.log('Запрос с параметрами:', {
                ktype,
                categoryId,
                vehicle,
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Catalog;
