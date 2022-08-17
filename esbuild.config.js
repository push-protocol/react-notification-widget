import esbuildServe from 'esbuild-serve';

esbuildServe(
  {
    logLevel: 'info',
    entryPoints: ['src/dev.tsx'],
    bundle: true,
    outfile: 'public/dist/app.js',
    sourcemap: true,
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    },
  },
  { root: 'public' }
);
