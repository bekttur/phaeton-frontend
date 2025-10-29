// app/routes.tsx
import { Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog/Catalog';
import Favorites from './pages/Favorites/Favorites';
import Home from './pages/Home/Home';
import Items from './pages/Catalog/elements/Items';
import ProductsPage from './pages/Catalog/elements/ProductsPage';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/catalog" element={<Catalog />} />
    <Route path="/catalog/:id" element={<Items />} />
    <Route path="/favorites" element={<Favorites/>} />
    <Route path="/products" element={<ProductsPage/>} />
  </Routes>
);
