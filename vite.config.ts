import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/transactions': {
        target:
          'https://uala-dev-challenge.s3.us-east-1.amazonaws.com/transactions.json',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/transactions/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
