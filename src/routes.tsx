// app/routes.tsx
import { Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog/Catalog';
import Favorites from './pages/Favorites/Favorites';
import Home from './pages/Home/Home';
import Items from './pages/Catalog/elements/Items';
import ProductsPage from './pages/Catalog/elements/ProductsPage';
import ConfirmationPage from './pages/Catalog/elements/ConfirmationPage';
import ProductPage from './pages/Catalog/elements/product-page';
import Search from './pages/Search/elements/Search';
import CheckoutPage from './pages/Basket/elements/CheckoutPage';
import MyOrders from './pages/MyOrders/MyOrders';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/catalog" element={<Catalog />} />
    <Route path="/:id" element={<Items />} />
    <Route path="/favorites" element={<Favorites />} />
    <Route path="/confirmation" element={<ConfirmationPage />} />
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/product/:id" element={<ProductPage />} />
    <Route path="/search" element={<Search />} />
    <Route path="/basket" element={<CheckoutPage />} />
    <Route path="/my-orders" element={<MyOrders />} />
  </Routes>
);
