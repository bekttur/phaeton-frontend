import Catalog from '../Catalog/Catalog'
import ProductsPage from '../Catalog/elements/ProductsPage'
import QuickSearchTabs from '../Catalog/elements/QuickSearchTabs'
import HeroSection from './elements/HeroSection'
import MissionAndPartners from './elements/MissionAndPartners'
import ServiceTipsCard from './elements/ServiceTipsCard'

const Home = () => {
	return (
		<div className='w-full bg-[#F6F6F6]'>
			<HeroSection />
			{/* <CatalogCategories /> */}
			<span className='px-2 mt-6 mb-2 block text-lg font-semibold'>
				Быстрый поиск запчасти
			</span>
			<QuickSearchTabs />
			<Catalog />
			{/* <FindByBrand /> */}
			<span className='px-2 mt-6 mb-2 block text-lg font-semibold'>
				Популярные товары
			</span>
			<ProductsPage />
			<ServiceTipsCard />
			<MissionAndPartners />
		</div>
	)
}

export default Home