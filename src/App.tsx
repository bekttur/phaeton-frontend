import { AppRoutes } from './routes';
import BottomNav from './components/BottomNav/BottomNav';
import Header from './components/Header/Header';
import DesktopHeader from './components/Header/DesktopHeader';

function App() {
  return (
    <>
      <Header />
      <DesktopHeader />
      <main>
        <AppRoutes />
      </main>
      <BottomNav />
      <div className='w-full bg-[#E3E6E8] h-52 hidden lg:block mt-20'></div>
    </>
  );
}

export default App;
