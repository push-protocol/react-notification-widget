import esbuildServe from 'esbuild-serve';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

// esbuildServe is used to build instead of regular esbuild, as regular esbuild causes an unexplainable bug in the
// EnterVerificationCode component.
esbuildServe({
  bundle: true,
  minify: true,
  entryPoints: ['src/development/index.tsx'],
  external: ['styled-components', 'react', 'react-dom'],
  outfile: './demo/js/app.js',
  loader: {
    '.js': 'jsx',
  },
  plugins: [
    NodeGlobalsPolyfillPlugin({
      buffer: true,
      process: true,
    })
  ],
  define: {
    'WHEREVER_ENV': JSON.stringify('production'),
    global: 'window',
  },
});
