const mapboxgl = require('mapbox-gl');
const insertCss = require('insert-css');
const fs = require('fs');

mapboxgl.accessToken = window.localStorage.getItem('MapboxAccessToken');

insertCss(fs.readFileSync('./node_modules/mapbox-gl/dist/mapbox-gl.css', 'utf8'));

const mapDiv = document.body.appendChild(document.createElement('div'));
mapDiv.style = 'position:absolute;top:0;right:0;left:0;bottom:0;';

const menuDiv = document.body.appendChild(document.createElement('div'));
menuDiv.style = 'position:absolute;background:#ffffffaa;';

const map = window.map = new mapboxgl.Map({
    container: mapDiv,
    zoom: 18,
    center: [2.3592843, 48.8767904],
    style: 'mapbox://styles/mapbox/streets-v10'
});

function createMenuButton(mapPath, center) {
    const btn = document.createElement('button');
    btn.innerHTML = mapPath.replace(/^.*[\\\/]/, '');
    btn.style = 'display: block; margin: 10px;';
    btn.addEventListener('click', () => { map.flyTo({ center, zoom: 18, duration: 2000 }); });
    menuDiv.appendChild(btn);
}

/**
 * Indoor specific
 */

const { Indoor, IndoorControl, IndoorMap } = require('../src/index');

// Create indoor handler
const indoor = new Indoor(map);

// Create custom maps
// Note: center is just used to switch between the three maps using map.flyTo() in the menu.
const geojsonMaps = [
    { path: 'gare-de-l-est.geojson', center: [2.3592843, 48.8767904] },
    { path: 'caserne.geojson', center: [5.723078, 45.183754] },
    { path: 'grand-place.geojson', center: [5.732179, 45.157955], defaultLevel: 1 },
];

geojsonMaps.forEach(({ path, center }) => createMenuButton(path, center));

// Where the indoor layers will be inserted.
// Here, 'housenum-label' comes from streets-v10
const beforeLayerId = 'housenum-label';

// To avoid unwanted overlap from streets-v10 layers, some layers are hidden when an indoor map is shown
const layersToHide = ['poi-scalerank4-l15', 'poi-scalerank4-l1', 'poi-scalerank3', 'road-label-small'];

geojsonMaps.forEach(async ({ path, defaultLevel }) => {

    // Retrieve geojson from path
    const geojson = await (await fetch(path)).json();

    // Create indoor map from geojson and options
    const indoorMap = IndoorMap.fromGeojson(geojson, { beforeLayerId, layersToHide, defaultLevel });

    // Add map to the indoor handler
    indoor.addMap(indoorMap);
});

indoor.on('map.loaded', console.log);
indoor.on('map.unloaded', console.log);
indoor.on('levels.range.changed', console.log);
indoor.on('level.changed', console.log);

// Add the specific control
map.addControl(new IndoorControl(indoor));
