import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/ui/Breadcrumb/Breadcrumb';
import { catalog_data } from './elements/catalog.data';

const Catalog = () => {
  return (
    <div className='px-2 bg-[#F6F6F6] mb-3'>
      <Breadcrumb
        items={[
          {
            title: 'Главная',
            href: '/',
          },
          {
            title: 'Каталог товаров',
          },
        ]}
      />
      <h1 className='text-2xl font-semibold' style={{ lineHeight: 3 }}>
        Каталог товаров
      </h1>
      <div className='grid grid-cols-3 gap-[13px] '>
        {catalog_data.map((item) => (
          <Link
            to={`${item.id}`}
            key={item.id}
            className='aspect-square bg-[#FDFDFD] border border-[#E9EBEE] rounded-md px-2 py-1'
          >
            <div
              className='w-full h-full bg-contain bg-bottom bg-no-repeat rounded-md flex items-start'
              style={{ backgroundImage: `url(${import.meta.env.BASE_URL}${item.img})` }}
            >
              <span className='text-sm font-medium text-[#56625A]'>
                {item.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
