import { Map as MapboxMap } from 'mapbox-gl';
import osmtogeojson from '@map-gl-indoor/osmtogeojson';

import accessToken from './mapbox-access-token';
import { addIndoorTo, IndoorMap } from '../src/index';

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
});

/**
 * Indoor specific
 */

const enhancedMapboxMap = addIndoorTo(map);

// Retrieve the geojson from the osm path
fetch('maps/caserne.osm')
    .then(response => response.text())
    .then(osmString => (new window.DOMParser()).parseFromString(osmString, "text/xml"))
    .then(osmXml => osmtogeojson(osmXml))
    .then((geojson: any) => {
        enhancedMapboxMap.indoor.addMap(IndoorMap.fromGeojson(geojson));
    });

// Add the specific control
map.addControl(enhancedMapboxMap.indoor.control);
