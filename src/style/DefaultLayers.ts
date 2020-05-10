import * as defaultLayers from './default_layers.json';

import type { LayerSpecification } from '../types';

let layers: Array<LayerSpecification> = defaultLayers;

/**
 * Transform the generic "poi-indoor" layer into multiple layers using filters based on OSM tags
 */

const POI_LAYER_ID = "poi-indoor";

const OSM_FILTER_MAPBOX_MAKI_LIST = [
    {
        filter: ['filter-==', 'amenity', 'fast_food'],
        maki: 'fast-food'
    },
    {
        filter: ['filter-==', 'amenity', 'restaurant'],
        maki: 'restaurant'
    },
    {
        filter: ['filter-==', 'amenity', 'cafe'],
        maki: 'cafe'
    },
    {
        filter: ['filter-==', 'amenity', 'bank'],
        maki: 'bank'
    },
    {
        filter: ['filter-==', 'amenity', 'toilets'],
        maki: 'toilet'
    },
    {
        filter: ['filter-==', 'shop', 'travel_agency'],
        maki: 'suitcase'
    },
    {
        filter: ['filter-==', 'shop', 'convenience'],
        maki: 'grocery'
    },
    {
        filter: ['filter-==', 'shop', 'bakery'],
        maki: 'bakery'
    },
    {
        filter: ['filter-==', 'shop', 'chemist'],
        maki: 'pharmacy'
    },
    {
        filter: ['filter-==', 'shop', 'clothes'],
        maki: 'clothing-store'
    },
    {
        filter: ['filter-==', 'highway', 'steps'],
        maki: 'entrance'
    },
    {
        filter: ['has', 'shop'],
        maki: 'shop'
    }
];

function createPoiLayers(metaLayer: LayerSpecification): Array<LayerSpecification> {
    return OSM_FILTER_MAPBOX_MAKI_LIST.map(poi => {
        const newLayer = Object.assign({}, metaLayer);
        newLayer.id += `-${poi.maki}`;
        newLayer.filter = poi.filter;
        newLayer.layout['icon-image'] = (`${poi.maki}-15`);
        return newLayer;
    });
}

const poiLayer = layers.find(layer => layer.id === POI_LAYER_ID);
if (poiLayer) {
    // Convert poi-indoor layer into several poi-layers
    createPoiLayers(poiLayer).forEach(_layer => layers.push(_layer));
    layers = layers.filter(layer => layer.id !== POI_LAYER_ID);
}

export default layers;
