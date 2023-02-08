import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import rollupNodePolyFill from 'rollup-plugin-polyfill-node';

export default defineConfig({
  build: {
    minify: true,
    rollupOptions: {
      plugins: [rollupNodePolyFill(), tsconfigPaths()],
    },
  },
  define: {
    WHEREVER_ENV: JSON.stringify('production'),
  },
});
