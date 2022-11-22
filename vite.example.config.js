// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { readdirSync } from 'fs';

const examplePath = resolve(__dirname, './example');

const dirCont = readdirSync( examplePath );
const htmlFiles = dirCont
    .filter( ( elm ) => elm.match(/.*\.(html?)/ig))
    .map(file => resolve(examplePath, file));

export default defineConfig({
    root: examplePath,
    build: {
        outDir: resolve(__dirname, 'dist', 'example'),
        sourcemap: true,
        target: 'esnext',
        rollupOptions: {
            input: htmlFiles
        }
    }
});
