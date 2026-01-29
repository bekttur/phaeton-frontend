import { AppRoutes } from './routes';
import { useLocation } from 'react-router-dom';
import BottomNav from './components/BottomNav/BottomNav';
import Header from './components/Header/Header';
import DesktopHeader from './components/Header/DesktopHeader';
import CartModal from './pages/Basket/elements/CartModal';

function App() {
  const { pathname } = useLocation();


  return (
    <>
      {!pathname.includes('/garage') && <Header />}
      <DesktopHeader />

      <main>
        <AppRoutes />
        <CartModal />
      </main>

      <BottomNav />
    </>
  );
}

export default App;
