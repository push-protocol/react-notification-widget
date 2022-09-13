import esbuildServe from 'esbuild-serve';

esbuildServe({
  entryPoints: ['./src/dev.tsx'],
  outfile: './public/dev/app.js',
  bundle: true,
  sourcemap: true,
  loader: {
    '.js': 'jsx',
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
});
