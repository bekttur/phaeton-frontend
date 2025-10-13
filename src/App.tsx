import { AppRoutes } from './routes';
import BottomNav from './components/BottomNav/BottomNav';
import Header from './components/Header/Header';

function App() {
  return (
    <>
      <Header />
      <main>
        <AppRoutes />
      </main>
      <BottomNav />
    </>
  );
}

export default App;
