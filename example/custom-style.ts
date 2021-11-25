import { Map as MapboxMap } from 'mapbox-gl';

import accessToken from './mapbox-access-token';
import { addIndoorTo, IndoorMap } from '../src/index';

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
});

/**
 * Indoor specific
 */

const enhancedMapboxMap = addIndoorTo(map);

const layers = [
    {
        "filter": [
            "filter-==",
            "indoor",
            "room"
        ],
        "id": "indoor-rooms",
        "type": "fill",
        "source": "indoor",
        "paint": {
            "fill-color": "#FF0000",
            "fill-opacity": 0.5
        }
    },
    {
        "filter": [
            "filter-==",
            "indoor",
            "area"
        ],
        "id": "indoor-areas",
        "type": "fill",
        "source": "indoor",
        "paint": {
            "fill-color": "#0000FF",
            "fill-opacity": 0.5
        }
    }
]


// Retrieve the geojson from the path and add the map
fetch('maps/gare-de-l-est.geojson')
    .then(res => res.json())
    .then(geojson => {
        enhancedMapboxMap.indoor.addMap(IndoorMap.fromGeojson(geojson, { layers }));
    });

// Add the specific control
map.addControl(enhancedMapboxMap.indoor.control);
