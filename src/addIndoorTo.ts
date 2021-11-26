import IndoorLayer from './IndoorLayer';

import type { EnhancedMapboxMap } from './Types';
import type { Map as MapboxMap } from 'mapbox-gl';

export default function addIndoorTo(map: MapboxMap): EnhancedMapboxMap {
    Object.defineProperty(
        map,
        'indoor',
        {
            get: function () {
                if (!this._indoor) {
                    this._indoor = new IndoorLayer(this);
                }
                return this._indoor;
            }
        });

    return map as EnhancedMapboxMap;
}
