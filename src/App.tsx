import { AppRoutes } from './routes';
import BottomNav from './components/BottomNav/BottomNav';
import Header from './components/Header/Header';
import DesktopHeader from './components/Header/DesktopHeader';
import CartModal from './pages/Basket/elements/CartModal';

function App() {
  return (
    <>
      <Header />
      <DesktopHeader />
      <main>
        <AppRoutes />
        <CartModal />
      </main>
      <BottomNav />
      <div className='w-full bg-[#E3E6E8] h-52 hidden lg:block mt-20'></div>
    </>
  );
}

export default App;
