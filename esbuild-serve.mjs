import esbuildServe from 'esbuild-serve';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

esbuildServe({
  entryPoints: ['./src/development/index.tsx'],
  outfile: './public/js/app.js',
  bundle: true,
  sourcemap: true,
  loader: {
    '.js': 'jsx',
  },
  define: {
    'WHEREVER_ENV': JSON.stringify('development'),
    global: 'window',
  },
  plugins: [
    NodeGlobalsPolyfillPlugin({
      buffer: true,
      process: true,
    })
  ],
}, { port: 7001 });
