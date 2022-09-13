import { createRequire } from 'module';
import { buildSync } from 'esbuild';

const require = createRequire(import.meta.url);

const entryFile = 'src/dev.tsx';

buildSync({
  bundle: true,
  entryPoints: [entryFile],
  outfile: './public/dist/app.js',
  sourcemap: true,
  loader: {
    '.js': 'jsx',
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
});
