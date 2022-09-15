import esbuildServe from 'esbuild-serve';

esbuildServe({
  entryPoints: ['./src/development/index.tsx'],
  outfile: './public/js/app.js',
  bundle: true,
  sourcemap: true,
  loader: {
    '.js': 'jsx',
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'), // required for bundling
    'process.env.WHEREVER_ENV': JSON.stringify('development'),
    global: 'window',
  },
});
