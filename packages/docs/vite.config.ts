import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'rx-form',
  build:{
    outDir:'../../docs',
  }
  // preprocessorOptions: {
  //   less: {
  //     math: 'parens-division',
  //   },
  // },
});
