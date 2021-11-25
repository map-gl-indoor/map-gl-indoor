import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import centroid from '@turf/centroid';

import accessToken from './mapbox-access-token';
import { addIndoorTo, IndoorMap } from '../src/index';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
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

let customData;

// Retrieve the geojson from the path and add the map
fetch('maps/gare-de-l-est.geojson')
    .then(res => res.json())
    .then(geojson => {
        map.indoor.addMap(IndoorMap.fromGeojson(geojson));
        customData = geojson;
    });

// Add search controls to the map.
map.addControl(
    new MapboxGeocoder({
        localGeocoderOnly: true,
        localGeocoder: (query) => {
            var matchingFeatures = [];
            for (var i = 0; i < customData.features.length; i++) {
                var feature = customData.features[i];
                if (feature.properties.name
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
        mapboxgl: mapboxgl,
        marker: false,
        on: {
            'result': (geocoder) => {
                if (geocoder.result.properties && geocoder.result.properties.level) {
                    map.indoor.setLevel(parseInt(geocoder.result.properties.level));
                }
            }
        }
    }), 'top-left'
);


// Add the specific control
map.addControl(map.indoor.control, 'top-left');
