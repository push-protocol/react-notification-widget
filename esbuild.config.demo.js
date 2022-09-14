import { buildSync } from 'esbuild';

buildSync({
  bundle: true,
  minify: true,
  entryPoints: ['src/development/index.tsx'],
  outfile: './demo/js/app.js',
  loader: {
    '.js': 'jsx',
  },
  define: {
    'process.env.WHEREVER_ENV': JSON.stringify('staging'),
    'process.env.NODE_ENV': JSON.stringify('production'), // required for bundling
  },
});
