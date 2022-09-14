import { buildSync } from 'esbuild';

const entryFile = 'src/development/index.tsx';

buildSync({
  bundle: true,
  minify: true,
  entryPoints: [entryFile],
  outfile: './public/demo/app.js',
  loader: {
    '.js': 'jsx',
  },
});
