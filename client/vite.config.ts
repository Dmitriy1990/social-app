import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import paths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), paths()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3001/',
    //     changeOrigin: true,
    //     ws: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
});
