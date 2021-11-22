import MapGLIndoor from './MapGLIndoor';
import type { MapGLMap } from './types';

export function addIndoorSupportTo(map: MapGLMap) {
    Object.defineProperty(
        map,
        'indoor',
        {
            get: function () {
                if (!this._indoor) {
                    this._indoor = new MapGLIndoor(this);
                }
                return this._indoor;
            }
        });
}

export { default as IndoorMap } from './IndoorMap';
export { default as MapServerHandler } from './MapServerHandler';
export { default as DefaultStyle } from './style';
