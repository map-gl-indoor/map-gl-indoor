import IndoorLayer from './IndoorLayer';

import type { MapGLWithIndoor, MapGL } from './Types';

export default function addIndoorTo(map: MapGL): MapGLWithIndoor {
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

    return map as MapGLWithIndoor;
}
