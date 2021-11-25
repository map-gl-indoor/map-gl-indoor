import { Map as MapboxMap } from 'mapbox-gl';

import accessToken from './mapbox-access-token';
import { addIndoorTo, IndoorMap } from '../src/index';

import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';

import type { EnhancedMapboxMap } from '../src/index';

const app = document.querySelector<HTMLDivElement>('#app')!

const map: EnhancedMapboxMap = new MapboxMap({
    container: app,
    zoom: 18,
    center: [2.3592843, 48.8767904],
    style: 'mapbox://styles/mapbox/streets-v10',
    accessToken,
    hash: true
});

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

map.on('indoor.map.loaded', console.log);
map.on('indoor.map.unloaded', console.log);
map.on('indoor.level.changed', console.log);
map.on('indoor.control.clicked', console.log);
