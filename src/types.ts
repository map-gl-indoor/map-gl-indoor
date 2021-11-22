
export type Level = number;

export type LevelsRange = {
    min: Level,
    max: Level
};

export type IndoorMapOptions = {
    beforeLayerId?: string,
    defaultLevel?: number,
    layers?: Array<LayerSpecification>,
    layersToHide?: Array<string>,
    showFeaturesWithEmptyLevel?: boolean
}

// The two following types should come from mapboxgl-style-spec
export type LayerSpecification = any;
export type FilterSpecification = any[] | null;

import type MapGLIndoor from './MapGLIndoor';

import type {
    Map as MapboxMap,
    LngLat as LngLatMapbox,
    LngLatBounds as LngLatBoundsMapbox
} from 'mapbox-gl';

import type {
    Map as MaplibreMap,
    LngLat as LngLatMaplibre,
    LngLatBounds as LngLatBoundsMaplibre
} from 'maplibre-gl';

export type MapGLMap = (MapboxMap | MaplibreMap) & {
    indoor?: MapGLIndoor
};

export type LngLatMapGL = LngLatMapbox | LngLatMaplibre;
export type LngLatBoundsMapGL = LngLatBoundsMapbox | LngLatBoundsMaplibre;
