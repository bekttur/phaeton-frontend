import { useLocation } from 'react-router-dom';
import FixedCartButton from './FixedCartButton';
import ProductGallery from './ProductGallery';
import ProductTabs from './ProductTabs';
import Reviews from './Reviews';
import SearchHeader from './SearchHeader';

const ProductPage = () => {
  const location = useLocation();

  const state = location.state as {
    product?: any;
    from?: {
      article?: string;
      brand?: string;
    };
  };

  const product = state?.product;

  if (!product) {
    return <div className='pt-14'>Товар не найден</div>;
  }

  return (
    <div className='min-h-screen bg-gray-100 pt-14'>
      <SearchHeader />
      <ProductGallery product={product} />
      <ProductTabs product={product} />
      <Reviews />
      <FixedCartButton product={product} />
    </div>
  );
};

export default ProductPage;
