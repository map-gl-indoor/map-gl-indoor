import Style from './style';
import GeoJsonHelper from './GeojsonHelper';

import type { GeoJSON } from 'geojson';

import type { LevelsRange, IndoorMapOptions, LayerSpecification } from './Types';
import type { LngLatBounds } from 'mapbox-gl';

class IndoorMap {
    bounds: LngLatBounds;
    geojson: any;
    layers: Array<LayerSpecification>;
    levelsRange: LevelsRange;
    beforeLayerId?: string;
    layersToHide: Array<string>;
    defaultLevel: number;
    showFeaturesWithEmptyLevel: boolean;

    constructor(bounds: LngLatBounds,
        geojson: GeoJSON,
        layers: Array<LayerSpecification>,
        levelsRange: LevelsRange,
        layersToHide: Array<string>,
        defaultLevel: number,
        showFeaturesWithEmptyLevel: boolean,
        beforeLayerId?: string
    ) {

        this.bounds = bounds;
        this.geojson = geojson;
        this.layers = layers;
        this.levelsRange = levelsRange;
        this.layersToHide = layersToHide;
        this.defaultLevel = defaultLevel;
        this.showFeaturesWithEmptyLevel = showFeaturesWithEmptyLevel;
        this.beforeLayerId = beforeLayerId;

    }

    static fromGeojson(geojson: GeoJSON, options: IndoorMapOptions = {}) {

        const { bounds, levelsRange } = GeoJsonHelper.extractLevelsRangeAndBounds(geojson);

        const map = new IndoorMap(
            bounds,
            geojson,
            options.layers ? options.layers : Style.DefaultLayers,
            levelsRange,
            options.layersToHide ? options.layersToHide : [],
            options.defaultLevel ? options.defaultLevel : 0,
            options.showFeaturesWithEmptyLevel ? options.showFeaturesWithEmptyLevel : false,
            options.beforeLayerId);

        return map;
    }
}

export default IndoorMap;
