import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
       <BrowserRouter basename={import.meta.env.MODE === 'production' ? '/phaeton-frontend' : '/'}>
        <App />
        </BrowserRouter>
    </Theme>
  </StrictMode>
);
