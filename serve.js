/**
 * Live Reloading MVP:
 * https://github.com/zaydek/esbuild-hot-reload/blob/master/serve.js
 */

const { build } = require("esbuild");
const chokidar = require("chokidar");
const liveServer = require("live-server");

(async () => {
    const builder = await build({
        bundle: true,
        define: {
            "process.env.NODE_ENV": JSON.stringify(
                process.env.NODE_ENV || "development"
            ),
        },
        entryPoints: ["src/index.tsx"],
        incremental: true,
        minify: process.env.NODE_ENV === "production",
        outfile: "public/script.js",
        sourcemap: true,
    });
    chokidar
        .watch("src/**/*.{ts,tsx}", {
            interval: 0, // No delay
        })
        .on("all", () => {
            builder.rebuild();
        });
    liveServer.start({
        open: true,
        port: +process.env.PORT || 8080,
        root: "public",
    });
})();