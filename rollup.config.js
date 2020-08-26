import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";

import pkg from './package.json'

const input = 'src/index.ts';

const outputUmd = {
    file: pkg.main.slice(0, -3) + ".umd" + pkg.main.slice(-3),
    format: 'umd',
    name: 'mapboxgl_indoor',
    globals: {
        'mapbox-gl': 'mapboxgl'
    }
};

const outputUmdMinified = Object.assign({}, outputUmd, {
    file: outputUmd.file.slice(0, -3) + ".min" + outputUmd.file.slice(-3),
    plugins: [terser()]
});


export default [

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
            commonjs({ namedExports: { '@turf/distance': ['distance'] } }),
            resolve({ browser: true }),
        ],
        external: [
            'mapbox-gl'
        ]
    },

    /**
     * For NPMJS
     */
    {
        input,
        output: [
            {
                file: pkg.module,
                format: 'es'
            },
            {
                file: pkg.main,
                format: 'cjs'
            }
        ],
        plugins: [
            json(),
            typescript(),
            resolve({ browser: true, jsnext: true })
        ],
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
        ]
    }
];
