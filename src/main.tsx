import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ui/ScrollToTop/ScrollToTop.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Theme>
        <BrowserRouter
          basename={
            import.meta.env.MODE === 'production' ? '/phaeton-frontend' : '/'
          }
        >
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </Theme>
    </QueryClientProvider>
  </StrictMode>
);
