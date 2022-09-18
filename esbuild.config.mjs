import { nodeExternalsPlugin } from 'esbuild-node-externals';

const { buildSync } = require('esbuild');
const { dependencies } = require('./package.json');

const entryFile = 'src/index.tsx';

const shared = {
  bundle: true,
  entryPoints: [entryFile],
  external: Object.keys(dependencies),
  logLevel: 'info',
  minify: true,
  splitting: true,
  sourcemap: true,
  plugins: [nodeExternalsPlugin()],
  define: {
    global: 'window',
  },
  loader: {
    '.js': 'jsx',
  },
};

buildSync({
  ...shared,
  // splitting: true,
  format: 'esm',
  outfile: './dist/index.esm.js',
  target: ['esnext', 'node12.22.0'],
});

buildSync({
  ...shared,
  format: 'cjs',
  outfile: './dist/index.cjs.js',
  target: ['esnext', 'node12.22.0'],
});
