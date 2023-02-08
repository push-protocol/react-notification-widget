import { defineConfig } from 'vite';
import rollupNodePolyFill from 'rollup-plugin-polyfill-node';

export default defineConfig({
  build: {
    minify: true,
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
  define: {
    WHEREVER_ENV: JSON.stringify('production'),
  },
});
