import mapboxgl from 'mapbox-gl';

import IndoorLayer from './IndoorLayer';
import IndoorMap from './IndoorMap';
import MapServerHandler from './MapServerHandler';
import DefaultStyle from './style';

Object.defineProperty(
    mapboxgl.Map.prototype,
    'indoor',
    {
        get: function () {
            if (!this._indoor) {
                this._indoor = new IndoorLayer(this);
            }
            return this._indoor;
        }
    });


export { IndoorMap, MapServerHandler, DefaultStyle };
