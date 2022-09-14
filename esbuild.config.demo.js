import esbuildServe from 'esbuild-serve';

// esbuildServe is used to build instead of regular esbuild, as regular esbuild causes an unexplainable bug in the
// EnterVerificationCode component.
esbuildServe({
  bundle: true,
  minify: true,
  entryPoints: ['src/development/index.tsx'],
  outfile: './demo/js/app.js',
  loader: {
    '.js': 'jsx',
  },
  define: {
    'process.env.WHEREVER_ENV': JSON.stringify('staging'),
    'process.env.NODE_ENV': JSON.stringify('production'), // required for bundling
  },
});
