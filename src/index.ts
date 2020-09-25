import mapboxgl from 'mapbox-gl';

import Indoor from './Indoor';
import IndoorMap from './IndoorMap';
import MapServerHandler from './MapServerHandler';
import DefaultStyle from './style';

Object.defineProperty(
    mapboxgl.Map.prototype,
    'indoor',
    {
        get: function () {
            if (!this._indoor) {
                this._indoor = new Indoor(this);
            }
            return this._indoor;
        }
    });


export { IndoorMap, MapServerHandler, DefaultStyle };
