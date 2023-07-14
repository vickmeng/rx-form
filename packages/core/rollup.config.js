import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    manualChunks: {
      validators: ['src/validators/index.ts'],
    },
  },
  external: ['lodash', 'rxjs'],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
};
