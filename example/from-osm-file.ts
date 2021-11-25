import { Map as MapboxMap } from 'mapbox-gl';
import osmtogeojson from 'osmtogeojson';

import accessToken from './mapbox-access-token';
import { addIndoorTo, IndoorMap } from '../src/index';

import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';

import type { EnhancedMapboxMap } from '../src/index';

const app = document.querySelector<HTMLDivElement>('#app')!

const map: EnhancedMapboxMap = new MapboxMap({
    container: app,
    zoom: 18,
    center: [5.723078, 45.183754],
    style: 'mapbox://styles/mapbox/streets-v10',
    accessToken,
    hash: true
});

/**
 * Indoor specific
 */

addIndoorTo(map);

// Retrieve the geojson from the osm path
fetch('maps/caserne.osm')
    .then(response => response.text())
    .then(osmString => (new window.DOMParser()).parseFromString(osmString, "text/xml"))
    .then(osmXml => osmtogeojson(osmXml))
    .then((geojson: any) => {
        map.indoor.addMap(IndoorMap.fromGeojson(geojson));
    });

// Add the specific control
map.addControl(map.indoor.control);
