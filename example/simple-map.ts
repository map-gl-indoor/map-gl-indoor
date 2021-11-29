import { Map as MapboxMap } from 'mapbox-gl';

import accessToken from './mapbox-access-token';
import { addIndoorTo, IndoorMap, MapboxMapWithIndoor } from '../src/index';

import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!

const map = new MapboxMap({
    container: app,
    zoom: 18,
    center: [2.3592843, 48.8767904],
    style: 'mapbox://styles/mapbox/streets-v10',
    accessToken,
    hash: true
}) as MapboxMapWithIndoor;

/**
 * Indoor specific
 */

addIndoorTo(map);

// Retrieve the geojson from the path and add the map
fetch('maps/gare-de-l-est.geojson')
    .then(res => res.json())
    .then(geojson => {
        map.indoor.addMap(IndoorMap.fromGeojson(geojson));
    });

// Add the specific control
map.addControl(map.indoor.control);
