import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  const routes = [
    '/about',
    '/aesthetic',
    '/reconstructive',
    '/non-surgical',
    '/vascular',
    '/gallery',
    '/reviews',
    '/patient-journey',
    '/international',
    '/plastic-surgery-cost-chandigarh',
    '/surgiset-privacy',
    '/contact',
    '/concerns',
    '/liposuction-chandigarh',
    '/blog',
    '/blog/what-to-expect-from-liposuction-recovery'
  ];

  return {
    base: '/',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      Sitemap({
        hostname: 'https://drsumitaesthetics.com',
        dynamicRoutes: routes,
        exclude: ['/googleaa9a783d11c03575'],
      })
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
