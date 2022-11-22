// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { readdirSync } from 'fs';

const examplesPath = resolve(__dirname, './examples');

const dirCont = readdirSync( examplesPath );
const htmlFiles = dirCont
    .filter( ( elm ) => elm.match(/.*\.(html?)/ig))
    .map(file => resolve(examplesPath, file));

export default defineConfig({
    root: examplesPath,
    build: {
        outDir: resolve(__dirname, 'dist', 'examples'),
        sourcemap: true,
        target: 'esnext',
        rollupOptions: {
            input: htmlFiles
        }
    }
});
