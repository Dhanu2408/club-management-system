import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  // tsconfig uses jsx:"preserve" for Next.js, so tell the test transformer to compile JSX itself
  esbuild: { jsx: 'automatic' },
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  test: {
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
