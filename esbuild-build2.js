import esbuild from 'esbuild';

esbuild
  .build({
    entryPoints: ['./src/dev.tsx'],
    outfile: './public/dist/app.js',
    minify: true,
    bundle: true,
    loader: {
      '.js': 'jsx',
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    },
  })
  .catch(() => process.exit(1));
