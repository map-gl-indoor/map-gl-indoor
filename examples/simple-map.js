const mapboxgl = require('mapbox-gl');
const insertCss = require('insert-css');
const fs = require('fs');

mapboxgl.accessToken = window.localStorage.getItem('MapboxAccessToken');

insertCss(fs.readFileSync('./node_modules/mapbox-gl/dist/mapbox-gl.css', 'utf8'));

const mapDiv = document.body.appendChild(document.createElement('div'));
mapDiv.style = 'position:absolute;top:0;right:0;left:0;bottom:0;';

const map = window.map = new mapboxgl.Map({
    container: mapDiv,
    zoom: 18,
    center: [2.3592843, 48.8767904],
    style: 'mapbox://styles/mapbox/streets-v10'
});

/**
 * Indoor specific
 */

const { Indoor, IndoorControl, IndoorMap } = require('../src/index');

// Create the indoor handler
const indoor = new Indoor(map);

// Retrieve the geojson from the path and add the map
fetch('gare-de-l-est.geojson')
    .then(res => res.json())
    .then(geojson => {
        indoor.addMap(IndoorMap.fromGeojson(geojson));
    });

// Add the specific control
map.addControl(new IndoorControl(indoor));
