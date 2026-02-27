import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ui/ScrollToTop/ScrollToTop.tsx';
import "./i18n";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchModalProvider } from './context/SearchModalContext.tsx';
import { LoaderProvider } from './context/LoaderContext.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { CityProvider } from './context/CityContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { AccessTokenProvider } from './context/AccessTokenContext.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AccessTokenProvider>
          <Theme>
            <CityProvider>
              <CartProvider>
                <SearchModalProvider>
                  <LoaderProvider>
                    <BrowserRouter>
                      <ScrollToTop />
                      <App />
                    </BrowserRouter>
                  </LoaderProvider>
                </SearchModalProvider>
              </CartProvider>
            </CityProvider>
          </Theme>
        </AccessTokenProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
