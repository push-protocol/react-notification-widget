import { nodeExternalsPlugin } from 'esbuild-node-externals';
import { build } from 'esbuild';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

const entryFile = 'src/index.tsx';

const shared = {
  bundle: true,
  entryPoints: [entryFile],
  external: ['styled-components', 'react', 'react-dom'],
  logLevel: 'info',
  minify: true,
  sourcemap: true,
  plugins: [
    nodeExternalsPlugin(),
    NodeGlobalsPolyfillPlugin({
      buffer: true,
      process: true,
    })
],
  define: {
    global: 'window',
    'WHEREVER_ENV': JSON.stringify('production')
  },
  loader: {
    '.js': 'jsx',
  },
};

build({
  ...shared,
  // splitting: true,
  format: 'esm',
  splitting: true,
  outdir: './dist/esm',
  target: 'esnext',
});

build({
  ...shared,
  format: 'cjs',
  outdir: './dist/cjs',
  target: 'esnext',
});
