const esbuild = require('esbuild');
const inlineImage = require('esbuild-plugin-inline-image');

esbuild
  .build({
    entryPoints: ['./src/dev.tsx'],
    outfile: './public/dist/app.js',
    minify: true,
    bundle: true,
    loader: {
      '.js': 'jsx',
    },
    plugins: [inlineImage()],
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    },
  })
  .catch(() => process.exit(1));
