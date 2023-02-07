import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import rollupNodePolyFill from 'rollup-plugin-polyfill-node';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  build: {
    outDir: 'demo',
    sourcemap: true,
    minify: true,
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
  plugins: [react(), nodePolyfills()],
  define: {
    WHEREVER_ENV: JSON.stringify('production'),
  },
});
