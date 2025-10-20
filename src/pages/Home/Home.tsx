import CatalogCategories from './elements/CatalogCategories'
import FindByBrand from './elements/FindByBrand'
import HeroSection from './elements/HeroSection'
import MissionAndPartners from './elements/MissionAndPartners'
import ServiceTipsCard from './elements/ServiceTipsCard'

const Home = () => {
	return (
		<div className='w-full'>
			<HeroSection />
			<CatalogCategories />
			<FindByBrand />
			<ServiceTipsCard />
			<MissionAndPartners />
		</div>
	)
}

export default Home