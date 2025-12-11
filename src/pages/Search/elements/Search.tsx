import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSearch, useSearchByArticle } from '../../../hooks/useData';
import ProductsPage from '../../Catalog/elements/ProductsPage';
import { Check, ChevronLeft, Search, X } from 'lucide-react';
import { useSearchModal } from '../../../context/SearchModalContext';
import MobileSearch from '../../Search/MobileSearch';
import { useLoader } from '../../../context/LoaderContext';
import Items from '../../Catalog/elements/Items';
import Catalog from '../../Catalog/Catalog';
import { catalog_data } from '../../Catalog/elements/catalog.data';

const SearchPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { startRequest, finishRequest, loading } = useLoader();

  const article = params.get('article') || '';
  const urlBrand = params.get('brand') || '';

  const [selectedBrand, setSelectedBrand] = useState(urlBrand);
  const [isResettingBrand, setIsResettingBrand] = useState(false);

  const { open } = useSearchModal();

  const { data: brandList, refetch: brandListRefetch } = useSearchByArticle({
    article,
  });
  const { data: brandData, refetch: refetchBrand } = useSearch({
    article,
    brand: selectedBrand,
  });

  useEffect(() => {
    if (urlBrand) {
      setSelectedBrand(urlBrand);
    }
  }, [urlBrand]);

  const fetchBrandData = async () => {
    startRequest();
    try {
      await brandListRefetch();
      if (selectedBrand) {
        await refetchBrand();
      }
    } finally {
      finishRequest();
    }
  };

  useEffect(() => {
    fetchBrandData();
  }, [selectedBrand, article]);

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);

    navigate(`/search?article=${article}&brand=${brand}`, { replace: true });

    setTimeout(() => refetchBrand(), 0);
  };

  const handleInputClick = () => {
    open();
  };

  const handleChoosingOther = () => {
    setIsResettingBrand(true);
    setSelectedBrand('');

    navigate(`/search?article=${article}`, { replace: true });

    setTimeout(() => {
      setIsResettingBrand(false);
    }, 0);
  };

  const handleBack = () => {
    const hasBrand = params.get('brand');
    const hasArticle = params.get('article');

    if (hasBrand) {
      navigate(`/search?article=${article}`, { replace: true });
      setSelectedBrand('');
      return;
    }

    if (hasArticle) {
      navigate(`/`, { replace: true });
      return;
    }
    navigate(-1);
  };

  return (
    <div className='relative top-14 min-h-screen bg-[#F6F6F6] flex flex-col gap-4 px-4'>
      {/* SEARCH FIELD */}
      <div className='flex items-center gap-3 py-3'>
        <button
          onClick={handleBack}
          className='p-2 bg-[#EAECED] rounded-[10px]'
        >
          <ChevronLeft size={24} color='#8C8C8C' />
        </button>

        <div className='flex-1 relative'>
          <input
            type='text'
            placeholder='Поиск запчастей, например «фильтр»'
            value={article}
            onClick={handleInputClick}
            readOnly
            className='w-full h-[42px] pl-10 pr-4 bg-[#EAECED] rounded-[10px] text-base focus:outline-none'
          />
          <Search
            className='absolute left-3 top-1/2 -translate-y-1/2'
            height='20'
            width='20'
            color='#AEAEB2'
          />
        </div>
      </div>

      {!loading && !selectedBrand && (
        <>
          <div className='w-full bg-[#EAECED] flex items-start gap-2 rounded-[10px] p-3'>
            <div
              className={`${
                !!brandList && brandList.Items.length > 0
                  ? 'bg-[#4EBC73]'
                  : 'bg-[#B54C4C]'
              } rounded-full p-1 mt-1`}
            >
              {!!brandList && brandList.Items.length > 0 ? (
                <Check className='w-3 h-3 text-white' />
              ) : (
                <X className='w-3 h-3 text-white' />
              )}
            </div>

            {!!brandList && brandList.Items.length > 0 ? (
              <h3 className='font-semibold text-[#636366]'>
                Мы нашли товар по артикулу
              </h3>
            ) : (
              <h3 className='font-semibold text-[#636366]'>
                Нам не удалось найти товар по артикулу, попробуйте еще раз или
                выберите по каталогу
              </h3>
            )}
          </div>

          {brandList && brandList.Items.length === 0 && (
            <div className='grid grid-cols-3 gap-[13px]'>
              {catalog_data.map((item) => (
                <Link
                  to={`/${item.id}`}
                  key={item.id}
                  className='aspect-square bg-[#FDFDFD] border border-[#E9EBEE] rounded-[10px] px-2 py-1'
                >
                  <div
                    className='w-full h-full bg-contain bg-bottom bg-no-repeat rounded-md flex items-start'
                    style={{
                      backgroundImage: `url(${import.meta.env.BASE_URL}${
                        item.img
                      })`,
                    }}
                  >
                    <span className='text-sm font-medium text-[#56625A]'>
                      {item.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}

      {!loading &&
      selectedBrand &&
      brandData &&
      brandData.Items.length !== 0 &&
      !isResettingBrand ? (
        <div className='w-full flex items-center gap-4'>
          <div className='py-3 px-4 bg-[#4EBC73] rounded-[10px] text-white font-semibold'>
            {selectedBrand}
          </div>
          <div
            className='py-3 px-4 bg-[#EAECED] rounded-[10px] text-[#565656] font-semibold'
            onClick={handleChoosingOther}
          >
            Выбрать другой бренд
          </div>
        </div>
      ) : null}

      {selectedBrand &&
        brandData &&
        brandData.Items.length === 0 &&
        !isResettingBrand && (
          <div className='w-full flex flex-col gap-3'>
            <div className='w-full bg-[#EAECED] flex items-start gap-2 rounded-[10px] p-3'>
              <div className='bg-[#B54C4C] rounded-full p-1 mt-1'>
                <X className='w-3 h-3 text-white' />
              </div>
              <h3 className='font-semibold text-[#636366]'>
                К сожалению мы не смогли найти артикул по выбранному бренду
              </h3>
            </div>
            <button
              onClick={handleChoosingOther}
              className='w-full rounded-[10px] bg-[#EAECED] text-[#636366] text-base font-semibold py-2'
            >
              Выбрать другой бренд
            </button>
          </div>
        )}

      {/* BRAND LIST — скрываем, если бренд выбран */}
      {!loading && (
        <>
          {/* BRAND LIST */}
          {!selectedBrand && (
            <div className='flex flex-col gap-2'>
              {!!brandList && brandList.Items.length > 0 && (
                <h2 className='text-lg font-semibold mb-2'>
                  Выберите производителя товара
                </h2>
              )}

              {!!brandList &&
                brandList.Items.map((product: any) => (
                  <button
                    key={product.Brand}
                    onClick={() => handleBrandSelect(product.Brand)}
                    className='bg-white border p-3 rounded-xl text-left'
                  >
                    {product.Brand}
                  </button>
                ))}
            </div>
          )}

          {/* ITEMS */}
          {selectedBrand && brandData && (
            <ProductsPage
              items={brandData.Items}
              article={article}
              brand={selectedBrand}
            />
          )}
        </>
      )}

      <MobileSearch initialQuery={article} />
    </div>
  );
};

export default SearchPage;
