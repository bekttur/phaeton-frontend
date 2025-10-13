import CatalogCategories from './elements/CatalogCategories'
import FindByBrand from './elements/FindByBrand'
import HeroCarousel from './elements/HeroCarousel'
import MissionAndPartners from './elements/MissionAndPartners'
import ServiceTipsCard from './elements/ServiceTipsCard'

const Home = () => {
	return (
		<div className='w-full'>
			<HeroCarousel />
			<CatalogCategories />
			<FindByBrand />
			<ServiceTipsCard />
			<MissionAndPartners />
		</div>
	)
}

export default Home