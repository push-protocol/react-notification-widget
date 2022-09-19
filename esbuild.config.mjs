import { nodeExternalsPlugin } from 'esbuild-node-externals';
import { build } from 'esbuild';

const entryFile = 'src/index.tsx';

const shared = {
  bundle: true,
  entryPoints: [entryFile],
  logLevel: 'info',
  minify: true,
  sourcemap: true,
  plugins: [nodeExternalsPlugin()],
  define: {
    global: 'window',
  },
  loader: {
    '.js': 'jsx',
  },
};

build({
  ...shared,
  // splitting: true,
  format: 'esm',
  splitting: true,
  outdir: './dist/esm',
  target: 'esnext',
});

build({
  ...shared,
  format: 'cjs',
  outdir: './dist/cjs',
  target: 'esnext',
});
