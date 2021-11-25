// vite.config.js
const { resolve } = require('path')
const { defineConfig } = require('vite');

module.exports = defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'mapgl_indoor',
            fileName: (format) => `map-gl-indoor.${format}.js`
        },
        rollupOptions: {
            external: ['mapbox-gl'],
            output: {
                globals: {
                    'mapbox-gl': 'mapboxgl'
                }
            }
        }
    }
});
