import react from '@vitejs/plugin-react';
import { defineConfig, Plugin } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';

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
  plugins: [react(), nodePolyfills(), hotReloadHelper(), tsconfigPaths()],
  define: {
    global: 'window',
    WHEREVER_ENV: JSON.stringify('development'),
  },
  server: {
    port: 7001,
  },
});
