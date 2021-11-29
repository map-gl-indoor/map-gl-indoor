import IndoorLayer from './IndoorLayer';

import type { MapboxMapWithIndoor } from './Types';
import type { Map as MapboxMap } from 'mapbox-gl';

export default function addIndoorTo(map: MapboxMap): MapboxMapWithIndoor {
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

    return map as MapboxMapWithIndoor;
}
