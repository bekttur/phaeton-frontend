import { useLocation, useParams } from 'react-router-dom';
import FixedCartButton from './FixedCartButton';
import ProductGallery from './ProductGallery';
import ProductTabs from './ProductTabs';
import Reviews from './Reviews';
import SearchHeader from './SearchHeader';
import { useSearch } from '../../../../hooks/useData';

const ProductPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const from = params.get('from');

  const searchParams = new URLSearchParams(from?.split('?')[1]);
  const article = searchParams.get('article') || '';
  const brand = searchParams.get('brand') || '';

  const { data: brandData, isLoading } = useSearch({ article, brand });

  const product = brandData?.Items?.find((p: any) => p.ItemId == id) || null;

  console.log(product);
  

  if (isLoading) return <div className='pt-14'>Загрузка...</div>;
  if (!product) return <div className='pt-14'>Товар не найден</div>;

  return (
    <div className='min-h-screen bg-gray-100 pt-14'>
      <SearchHeader />
      <ProductGallery />
      <ProductTabs />
      <Reviews />
      <FixedCartButton />
    </div>
  );
};

export default ProductPage;
