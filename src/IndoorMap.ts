import Style from './style';
import GeoJsonHelper from './GeojsonHelper';

import type { GeoJSON } from 'geojson';
import type { LngLatBounds } from 'mapbox-gl';

import type { LevelsRange, IndoorMapOptions, LayerSpecification } from './types';

class IndoorMap {

    bounds: LngLatBounds;
    geojson: any;
    layers: Array<LayerSpecification>;
    levelsRange: LevelsRange;
    beforeLayerId?: string;
    layersToHide: Array<string>;
    defaultLevel: number;

    static fromGeojson(geojson: GeoJSON, options: IndoorMapOptions = {}) {

        const { bounds, levelsRange } = GeoJsonHelper.extractLevelsRangeAndBounds(geojson);

        const map = new IndoorMap();
        map.geojson = geojson;
        map.layers = options.layers ? options.layers : Style.DefaultLayers;
        map.bounds = bounds;
        map.levelsRange = levelsRange;
        map.layersToHide = options.layersToHide ? options.layersToHide : [];
        map.beforeLayerId = options.beforeLayerId;
        map.defaultLevel = options.defaultLevel ? options.defaultLevel : 0;

        return map;
    }

}

export default IndoorMap;
