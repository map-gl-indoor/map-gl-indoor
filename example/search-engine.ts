import { Map as MapboxMap } from 'mapbox-gl';
import MapboxGeocoder, { Result } from '@mapbox/mapbox-gl-geocoder';
import centroid from '@turf/centroid';

import accessToken from './mapbox-access-token';
import { addIndoorTo, IndoorControl, IndoorMap, MapboxMapWithIndoor } from '../src/index';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
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
const geojson = await (await fetch('maps/gare-de-l-est.geojson')).json();
map.indoor.addMap(IndoorMap.fromGeojson(geojson));

// Add search controls to the map.
const customGeocoder = new MapboxGeocoder({
    localGeocoderOnly: true,
    localGeocoder: (query: string): Result[] => {
        const matchingFeatures = [];
        for (let i = 0; i < geojson.features.length; i++) {
            const feature = geojson.features[i];
            if (feature.properties.name
                && feature.properties.name
                    .toLowerCase()
                    .search(query.toLowerCase()) !== -1
            ) {
                feature['place_name'] = feature.properties.name;
                feature['center'] = centroid(feature).geometry.coordinates;
                feature['place_type'] = ['park'];
                matchingFeatures.push(feature);
            }
        }
        return matchingFeatures;
    },
    accessToken,
    zoom: 20,
    placeholder: 'Enter search e.g. Room',
    marker: false
});
customGeocoder.on('result', (geocoder: any) => {
    if (geocoder.result.properties && geocoder.result.properties.level) {
        map.indoor.setLevel(parseInt(geocoder.result.properties.level));
    }
});
map.addControl(customGeocoder, 'top-left');

// Add the specific control
map.addControl(new IndoorControl());
