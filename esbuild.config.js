import { createRequire } from 'module';
import { buildSync } from 'esbuild';

const require = createRequire(import.meta.url);
const { dependencies } = require('./package.json');

const entryFile = 'src/index.tsx';

const shared = {
  bundle: true,
  entryPoints: [entryFile],
  external: Object.keys(dependencies),
  logLevel: 'info',
  minify: true,
  sourcemap: true,
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
