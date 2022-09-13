import { createRequire } from 'module';
import { buildSync } from 'esbuild';

// const require = createRequire(import.meta.url);

const entryFile = 'src/dev.tsx';

buildSync({
  bundle: true,
  minify: true,
  entryPoints: [entryFile],
  outfile: './public/dist/app.js',
  loader: {
    '.js': 'jsx',
  },
});
