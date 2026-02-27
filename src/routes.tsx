// app/routes.tsx
import { Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog/Catalog';
import Favorites from './pages/Favorites/Favorites';
import Home from './pages/Home/Home';
import ProductsPage from './pages/Catalog/elements/ProductsPage';
import ConfirmationPage from './pages/Catalog/elements/ConfirmationPage';
import ProductPage from './pages/Catalog/elements/product-page';
import Search from './pages/Search/elements/Search';
import CheckoutPage from './pages/Basket/elements/CheckoutPage';
import MyOrders from './pages/MyOrders/MyOrders';
import ArticlesProductPage from './pages/Catalog/elements/articles-product-page';
import { Garage } from './pages/Garage/Garage';
import Profile from './pages/Profile/Profile';
import Basket from './pages/Basket/Basket';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/catalog" element={<Catalog />} />
    <Route path="/favorites" element={<Favorites />} />
    <Route path="/confirmation" element={<ConfirmationPage />} />
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/product/:id" element={<ProductPage />} />
    <Route path="/articles-product/:id" element={<ArticlesProductPage />} />
    <Route path="/search" element={<Search />} />
    <Route path="/basket" element={<Basket />} />
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/my-orders" element={<MyOrders />} />
    <Route path="/garage" element={<Garage />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
);
