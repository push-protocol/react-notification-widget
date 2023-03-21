/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default defineConfig(() => {
  return {
    cacheDir: '../../node_modules/.vite/subscription-page',

    server: {
      port: 4200,
      host: 'localhost',
    },

    plugins: [
      react(),
      viteTsConfigPaths({
        root: '../../',
      }),
    ],

    build: {
      rollupOptions: {
        plugins: [rollupNodePolyFill()],
      },
    },

    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
          }),
        ],
      },
    },

    test: {
      globals: true,
      cache: {
        dir: '../../node_modules/.vitest',
      },
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
  };
});
