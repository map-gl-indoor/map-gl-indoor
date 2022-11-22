import { Map as MapboxMap } from 'mapbox-gl';
import osmtogeojson from 'osmtogeojson';

import accessToken from './mapbox-access-token';
import { addIndoorTo, IndoorControl, IndoorMap, MapboxMapWithIndoor } from '../src/index';

import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!

const map = new MapboxMap({
    container: app,
    zoom: 18,
    center: [5.723078, 45.183754],
    style: 'mapbox://styles/mapbox/streets-v10',
    accessToken,
    hash: true
}) as MapboxMapWithIndoor;

/**
 * Indoor specific
 */

addIndoorTo(map);

// Retrieve the geojson from the osm path
const osmString = await (await fetch('maps/caserne.osm')).text();
const osmXml = (new window.DOMParser()).parseFromString(osmString, "text/xml");
const geojson = osmtogeojson(osmXml);
map.indoor.addMap(IndoorMap.fromGeojson(geojson));

// Add the specific control
map.addControl(new IndoorControl());
