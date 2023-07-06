import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'es',
  },
  external: ['react'],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
};
