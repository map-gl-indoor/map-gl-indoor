import { LngLatLike, Map as MapboxMap } from 'mapbox-gl';

import accessToken from './mapbox-access-token';
import { addIndoorTo, IndoorControl, IndoorMap, MapboxMapWithIndoor } from '../src/index';

import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';
import './multiple-maps.css';

const app = document.querySelector<HTMLDivElement>('#app')!

const mapContainer = document.createElement('div');
mapContainer.id = 'map';
app.appendChild(mapContainer);

const map = new MapboxMap({
    container: mapContainer,
    zoom: 18,
    center: [2.3592843, 48.8767904],
    style: 'mapbox://styles/mapbox/streets-v10',
    accessToken,
    hash: true
}) as MapboxMapWithIndoor;

const menuContainer = document.createElement('div');
menuContainer.id = 'menu';
app.appendChild(menuContainer);


function createMenuButton(mapPath: string, center: LngLatLike) {
    const btn = document.createElement('button');
    btn.innerHTML = mapPath.replace(/^.*[/]/, '');
    btn.addEventListener('click', () => { map.flyTo({ center, zoom: 18, duration: 2000 }); });
    menuContainer.appendChild(btn);
}

/**
 * Indoor specific
 */

addIndoorTo(map);

// Create custom maps
// Note: center is just used to switch between the three maps using map.flyTo() in the menu.
const geojsonMaps: ({ path: string, center: LngLatLike, defaultLevel?: number }[]) = [
    { path: 'maps/gare-de-l-est.geojson', center: [2.3592843, 48.8767904] },
    { path: 'maps/caserne.geojson', center: [5.723078, 45.183754] },
    { path: 'maps/grand-place.geojson', center: [5.732179, 45.157955], defaultLevel: 1 }
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
    map.indoor.addMap(indoorMap);
});

// Add the specific control
map.addControl(new IndoorControl());

