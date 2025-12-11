import Catalog from '../Catalog/Catalog';
import ProductsPage from '../Catalog/elements/ProductsPage';
import QuickSearchTabs from '../Catalog/elements/QuickSearchTabs';
import HeroSection from './elements/HeroSection';
import MissionAndPartners from './elements/MissionAndPartners';
import ServiceTipsCard from './elements/ServiceTipsCard';
import PopularProducts from './elements/PopularProducts';

const Home = () => {
    // const { data: brandData, refetch: refetchBrand } = useSearch({
    //   article,
    //   brand: selectedBrand,
    // });

  return (
    <div className='w-full bg-[#F6F6F6]'>
      <HeroSection />
      {/* <CatalogCategories /> */}
      <span className='block lg:hidden px-4 mt-6 mb-2 text-lg font-semibold'>
        Быстрый поиск запчасти
      </span>
      <QuickSearchTabs />
      <Catalog />
      <span className='block lg:hidden px-4 mt-6 mb-2 text-lg font-semibold'>
        Популярные товары
      </span>
      <div className='px-4'>
        <ProductsPage />
      </div>

      <PopularProducts />

      <ServiceTipsCard />
      <MissionAndPartners />
    </div>
  );
};

export default Home;
