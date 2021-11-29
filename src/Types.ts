import type { FeatureCollection, Geometry } from 'geojson';
import type { Map as MapboxMap } from 'mapbox-gl';
import type IndoorLayer from './IndoorLayer';

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

export type IndoorMapGeoJSON = FeatureCollection<Geometry>;

// The two following types should come from mapboxgl-style-spec
export type LayerSpecification = any;
export type FilterSpecification = any[] | null;

export type MapboxMapWithIndoor = MapboxMap & {
    indoor: IndoorLayer
};
