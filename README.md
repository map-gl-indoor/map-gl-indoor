# MapGL Indoor Plugin

A [mapboxgl-js](https://github.com/mapbox/mapbox-gl-js) plugin to enable multi-floors maps

The project should works with [maplibre-gl-js](https://github.com/maplibre/maplibre-gl-js) too.

__Note:__ This is a work in progress and we welcome contributions.


## Demo

https://map-gl-indoor.github.io/

<img src="https://user-images.githubusercontent.com/3089186/81498920-f2ed3300-92c7-11ea-8314-1a5175c5e73a.png" style="max-width:600px" />

or examples in the [debug](debug) directory.

## Usage

Create an OSM indoor map following the [Simple Indoor Tagging guidelines](https://wiki.openstreetmap.org/wiki/Simple_Indoor_Tagging).

Transform the osm file into a geojson using [osmtogeojson](https://github.com/tyrasd/osmtogeojson).

Then use the following code:

```js
import { Map } from 'mapbox-gl';
import { addIndoorTo, IndoorControl, IndoorMap } from 'map-gl-indoor';

const map = new Map({
    accessToken,
    container,
    style: 'mapbox://styles/mapbox/streets-v10'
});

// Create the indoor logic behind the map.indoor property
addIndoorTo(map);

// Retrieve the geojson from the path and add the map
const geojson = await (await fetch('maps/gare-de-l-est.geojson')).json();
const indoorMap = IndoorMap.fromGeojson(geojson);
map.indoor.addMap(indoorMap);

// Add the specific control
map.addControl(new IndoorControl());
```

## Options

For the moment, refer to samples.


## How does it work?

The library parses the geojson to find [level tags](https://wiki.openstreetmap.org/wiki/Key:level) and retrieve the map range (minimum and maximum levels).

If the [viewport](https://github.com/mapbox/mapbox-gl-js/blob/master/src/ui/map.js#L601) of the map intersects the building bounds, then the map is selected and the `IndoorControl` is visible.

When a level is set (initialisation or user click), only the geojson features which have the level property equals (or in the range of) to the current level are shown.


## Provide geojson maps from a server

Have a look at the side project [indoor-maps-server](https://github.com/map-gl-indoor/indoor-maps-server) and the file [debug/with-map-server.html](debug/with-map-server.html)

## Developing

    npm install & npm run dev

Then, visit http://localhost:3000 to load the samples
