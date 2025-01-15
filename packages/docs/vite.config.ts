import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../../docs', // 将此路径修改为你想要的输出目录
  },
  // preprocessorOptions: {
  //   less: {
  //     math: 'parens-division',
  //   },
  // },
});
