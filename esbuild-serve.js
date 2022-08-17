const esbuild = require('esbuild');
const inlineImage = require('esbuild-plugin-inline-image');
const alias = require('esbuild-plugin-alias');

esbuild
  .serve(
    {
      servedir: 'public',
      port: 3000,
    },
    {
      entryPoints: ['./src/dev.tsx'],
      outfile: './public/dist/app.js',
      bundle: true,
      loader: {
        '.js': 'jsx',
      },
      plugins: [inlineImage()],
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }
  )
  .catch(() => process.exit(1));
