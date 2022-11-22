import { Map as MapboxMap, Popup } from 'mapbox-gl';

import accessToken from './mapbox-access-token';
import { addIndoorTo, IndoorControl, IndoorMap, MapboxMapWithIndoor } from '../src/index';

import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';
import { Point } from 'geojson';

const app = document.querySelector<HTMLDivElement>('#app')!

const map = new MapboxMap({
    container: app,
    zoom: 18,
    center: [2.3592843, 48.8767904],
    style: 'mapbox://styles/mapbox/streets-v10',
    accessToken,
    hash: true
}) as MapboxMapWithIndoor;

const mapLoadedPr = new Promise(resolve => map.on('load', resolve));

/**
 * Indoor specific
 */

addIndoorTo(map);

// Retrieve the geojson from the path and add the map
const geojson = await (await fetch('maps/gare-de-l-est.geojson')).json();
map.indoor.addMap(IndoorMap.fromGeojson(geojson));

// Add the specific control
map.addControl(new IndoorControl());

await mapLoadedPr;

const image: ImageData = await new Promise(resolve => map.loadImage(
    './img/red-marker.png', (_: string, image: ImageData) => resolve(image)));
map.addImage('poi', image);

map.addSource('pois', {
    type: 'geojson',
    data: {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [2.359497, 48.87688]
                },
                properties: {
                    level: '-1',
                    name: 'Paul'
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [2.358508, 48.877255]
                },
                properties: {
                    level: '0',
                    name: 'Relay'
                }
            }
        ]
    }
});

map.indoor.addLayerForFiltering({
    'id': 'pois',
    'type': 'symbol',
    'source': 'pois',
    'layout': {
        'icon-image': 'poi'
    }
});

map.on('click', 'pois', (e) => {

    const { geometry, properties } = e.features![0];
    const coordinates = (geometry as Point).coordinates.slice();
    const description = properties?.name + ' (level: ' + properties?.level + ')';

    new Popup()
        .setLngLat(coordinates as [number, number])
        .setHTML(description)
        .addTo(map);
});

map.on('mouseenter', 'pois', () => {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'pois', () => {
    map.getCanvas().style.cursor = '';
});

