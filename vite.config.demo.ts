import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import rollupNodePolyFill from 'rollup-plugin-polyfill-node';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  build: {
    outDir: 'demo',
    minify: true,
    rollupOptions: {
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        },
      },
      plugins: [rollupNodePolyFill()],
    },
  },
  plugins: [react(), nodePolyfills()],
  define: {
    WHEREVER_ENV: JSON.stringify('production'),
  },
});
