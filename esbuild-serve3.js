const { spawn } = require('child_process');
const { createServer, request } = require('http');
const esbuild = require('esbuild');

const clients = [];

esbuild
  .build({
    entryPoints: ['./src/dev.tsx'],
    bundle: true,
    loader: {
      '.js': 'jsx',
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    },
    outfile: './public/dist/app.js',
    watch: {
      onRebuild(error, result) {
        clients.forEach((res) => res.write('data: update\n\n'));
        clients.length = 0;
        console.log(error ? error : '...');
      },
    },
  })
  .catch(() => process.exit(1));

esbuild.serve({ servedir: 'public' }, {}).then(() => {
  createServer((req, res) => {
    const { url, method, headers } = req;
    if (req.url === '/esbuild')
      return clients.push(
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        })
      );
    const path = ~url.split('/').pop().indexOf('.') ? url : `/index.html`; //for PWA with router
    req.pipe(
      request({ hostname: '0.0.0.0', port: 8000, path, method, headers }, (prxRes) => {
        if (url === './public/dist/app.js') {
          const jsReloadCode =
            ' (() => new EventSource("/esbuild").onmessage = () => location.reload())();';

          const newHeaders = {
            ...prxRes.headers,
            'content-length': parseInt(prxRes.headers['content-length'], 10) + jsReloadCode.length,
          };

          res.writeHead(prxRes.statusCode, newHeaders);
          res.write(jsReloadCode);
        } else {
          res.writeHead(prxRes.statusCode, prxRes.headers);
        }

        prxRes.pipe(res, { end: true });
      }),
      { end: true }
    );
  }).listen(3000);

  setTimeout(() => {
    const op = {
      darwin: ['open'],
      linux: ['xdg-open'],
      win32: ['cmd', '/c', 'start'],
    };
    const ptf = process.platform;
    if (clients.length === 0) spawn(op[ptf][0], [...[op[ptf].slice(1)], `http://localhost:3000`]);
  }, 1000); //open the default browser only if it is not opened yet
});
