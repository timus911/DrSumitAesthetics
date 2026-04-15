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
    '/blog/what-to-expect-from-liposuction-recovery',
    '/blog/liposuction-vs-tummy-tuck-which-is-right-for-you',
    '/blog/does-liposuction-remove-fat-permanently',
    '/blog/the-mommy-makeover-journey',
    '/blog/high-definition-hd-liposuction-sculpting',
    '/blog/rhinoplasty-recovery-timeline',
    '/blog/preservation-rhinoplasty-secret-to-natural-noses',
    '/blog/blepharoplasty-eyelid-surgery-anti-aging',
    '/blog/traditional-vs-mini-facelift',
    '/blog/gynecomastia-surgery-india-causes-treatment',
    '/blog/breast-augmentation-implants-vs-fat-transfer',
    '/blog/what-to-expect-after-breast-reduction',
    '/blog/botox-vs-dermal-fillers',
    '/blog/the-rise-of-prejuvenation',
    '/blog/how-long-do-dermal-fillers-last',
    '/blog/preparing-for-your-first-aesthetic-consultation'
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
