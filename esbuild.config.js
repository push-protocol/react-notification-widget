#!/usr/bin/env node

import esbuildServe from "esbuild-serve";

esbuildServe(
    {
        logLevel: "info",
        entryPoints: ["src/index.tsx"],
        bundle: true,
        outfile: "public/main.js",
        sourcemap: true,
    },
    { root: "public" },
);
