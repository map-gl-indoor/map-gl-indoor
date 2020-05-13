import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";

import * as mapboxglPackage from './node_modules/mapbox-gl/package.json';

const paths = {
    'mapbox-gl': 'https://api.mapbox.com/mapbox-gl-js/v' + mapboxglPackage.version + '/mapbox-gl.js'
};

const globals = {
    'mapbox-gl': 'mapboxgl'
};

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/mapbox-gl-indoor.js',
            format: 'iife',
            name: 'mapboxgl_indoor',
            globals,
            paths
        },
        {
            file: 'dist/mapbox-gl-indoor.min.js',
            format: 'iife',
            plugins: [terser()],
            name: 'mapboxgl_indoor',
            globals,
            paths
        },
        {
            file: "dist/mapbox-gl-indoor.esm.js",
            format: "esm",
            paths
        }
    ],
    treeshake: {
        moduleSideEffects: false
    },
    plugins: [
        typescript(),
        json(),
        commonjs({
            namedExports: { '@turf/distance': ['distance'] }
        }),
        resolve({
            jsnext: true,
            browser: true
        })
    ],
    external: [
        'mapbox-gl'
    ]
};
