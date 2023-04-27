import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';
import rollupNodePolyFill from 'rollup-plugin-polyfill-node';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    minify: true,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Wherever Notification Widget',
      formats: ['es', 'cjs'],
      fileName: (format) => `${format}/index.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        },
      },
      plugins: [
        rollupNodePolyFill(),
        tsconfigPaths(),
        excludeDependenciesFromBundle({
          peerDependencies: true,
        }),
      ],
    },
  },
  plugins: [
    react(),
    dts({
      outputDir: './dist/types',
    }),
    nodePolyfills(),
  ],
  define: {
    WHEREVER_ENV: JSON.stringify('production'),
  },
});
