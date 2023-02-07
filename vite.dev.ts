import react from '@vitejs/plugin-react';
import { defineConfig, Plugin } from 'vite';
import rollupNodePolyFill from 'rollup-plugin-polyfill-node';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// Needed to avoid crashing on hot reload due to circular dependencies
// Reference: https://github.com/vitejs/vite/issues/3033#issuecomment-1360691044
export const hotReloadHelper = (): Plugin => ({
  name: 'singleHMR',
  handleHotUpdate({ modules }) {
    modules.map((m) => {
      m.importedModules = new Set();
      m.importers = new Set();
    });

    return modules;
  },
});

export default defineConfig({
  plugins: [react(), nodePolyfills(), hotReloadHelper()],
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
  optimizeDeps: {
    exclude: ['web3'],
  },
  define: {
    global: 'window',
    WHEREVER_ENV: JSON.stringify('development'),
  },
  server: {
    port: 7001,
  },
});
