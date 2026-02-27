import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => ({
  plugins: [react()],
  base: '/',
  // server: {
  //   proxy: {
  //     '/api/orders': {
  //       target: 'http://10.1.0.78:8099',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/orders/, '/orders'),
  //       secure: false,
  //     },
  //     '/api/users': {
  //       target: 'http://10.1.0.78:8099',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/users/, '/users'),
  //       secure: false,
  //     },
  //     '/api': {
  //     target: 'http://10.1.0.78:8099',
  //     changeOrigin: true,
  //     secure: false,
  //     rewrite: (path) => path.replace(/^\/api/, ''),
  //   },
  //   },
  // },
}));
