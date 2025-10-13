
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import BottomNav from './components/BottomNav/BottomNav';
import Header from './components/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <AppRoutes />
      </main>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;
