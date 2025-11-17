import FixedCartButton from './FixedCartButton';
import ProductGallery from './ProductGallery';
import ProductTabs from './ProductTabs';
import Reviews from './Reviews';
import SearchHeader from './SearchHeader';

const ProductPage = () => {
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
