import { Map as MapboxMap } from 'mapbox-gl';

import accessToken from './mapbox-access-token';
import { IndoorControl, MapServerHandler } from '../src/index';

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
const SERVER_URL = 'https://localhost:4001';

const indoorMapsOptions = {
    beforeLayerId: 'housenum-label',
    layersToHide: ['poi-scalerank4-l15', 'poi-scalerank4-l1', 'poi-scalerank3', 'road-label-small']
}

MapServerHandler.manage(SERVER_URL, map, indoorMapsOptions);

// Add the specific control
map.addControl(new IndoorControl());
