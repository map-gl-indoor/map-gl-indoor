import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import sourcemaps from 'rollup-plugin-sourcemaps';

import pkg from './package.json'

const input = 'src/index.ts';

const outputUmd = {
    sourcemap: true,
    file: pkg.main.slice(0, -3) + ".umd" + pkg.main.slice(-3),
    format: 'umd',
    name: 'mapgl_indoor',
    globals: {
        'mapbox-gl': 'mapboxgl',
        'maplibre-gl': 'maplibregl'
    }
};

const outputUmdMinified = Object.assign({}, outputUmd, {
    sourcemap: true,
    file: outputUmd.file.slice(0, -3) + ".min" + outputUmd.file.slice(-3),
    plugins: [terser()]
});


const prod = [

    /**
     * For CDN and debug
     */
    {
        input,
        output: [
            outputUmd,
            outputUmdMinified
        ],
        plugins: [
            json(),
            typescript(),
            commonjs(),
            resolve({ browser: true }),
            sourcemaps()
        ],
        external: [
            'mapbox-gl',
            'maplibre-gl'
        ]
    },

    /**
     * For NPMJS
     */
    {
        input,
        output: [
            {
                sourcemap: true,
                file: pkg.module,
                format: 'es'
            },
            {
                sourcemap: true,
                file: pkg.main,
                format: 'cjs'
            }
        ],
        plugins: [
            json(),
            typescript(),
            resolve({ browser: true, jsnext: true }),
            sourcemaps()
        ],
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
        ]
    }
];


const dev = [
    {
        input,
        output: [
            {
                sourcemap: true,
                file: 'debug/js/map-gl-indoor.js',
                format: 'es'
            }
        ],
        plugins: [
            json(),
            typescript(),
            resolve({ browser: true, jsnext: true }),
            sourcemaps()
        ]
    }
];

export default (cli) => cli.dev ? dev : prod;
