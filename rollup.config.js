import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";

export default {
    input: 'src/index.ts',
    output: [
        { file: 'dist/mapbox-gl-indoor.js', format: 'cjs' },
        { file: 'dist/mapbox-gl-indoor.minjs', format: 'cjs', plugins: [terser()] },
        { file: "dist/mapbox-gl-indoor.esm.js", format: "esm" }
    ],
    plugins: [
        typescript(),
        json(),
        commonjs({
            namedExports: { 'mapbox-gl': ['Evented', 'LngLat', 'LngLatBounds'] },
        }),
        resolve({
            jsnext: true,
            browser: true
        })
    ]
};
