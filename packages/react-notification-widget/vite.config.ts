/// <reference types="vitest" />
import { join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/react-notification-widget',
  plugins: [
    dts({
      entryRoot: 'src',
      tsConfigFilePath: join(__dirname, 'tsconfig.lib.json'),
      skipDiagnostics: true,
      outputDir: '../../dist/packages/react-notification-widget/types',
    }),
    react(),
    viteTsConfigPaths({
      root: '../../',
    }),
  ],
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    minify: true,
    sourcemap: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'Wherever Notification Widget',
      fileName: (format) => `${format}/index.js`,
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: ['react', 'react-dom', 'react/jsx-runtime', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        },
      },
      plugins: [
        viteTsConfigPaths({
          root: '../../',
        }),
        excludeDependenciesFromBundle({
          peerDependencies: true,
        }),
      ],
    },
  },
});
