import { buildSync } from 'esbuild';

buildSync({
  entryPoints: ['./src/development/index.tsx'],
  bundle: true,
  sourcemap: true,
  // minify: true,
  outfile: './public/demo/app.js',
  loader: {
    '.js': 'jsx',
  },
});
