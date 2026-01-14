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
    </>
  );
}

export default App;
