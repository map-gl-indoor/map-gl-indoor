FROM node:12 as builder

ARG commit=master

WORKDIR /

ADD https://github.com/ThibaudM/mapbox-gl-indoor-plugin/archive/${commit}.tar.gz .
RUN tar -zxvf ${commit}.tar.gz
RUN mv mapbox-gl-indoor-plugin-${commit} mapbox-gl-indoor-plugin

WORKDIR /mapbox-gl-indoor-plugin

COPY ./examples/indoor-maps/arcade.geojson ./examples/indoor-maps/arcade.geojson
COPY ./examples/multiple-maps.js           ./examples/multiple-maps.js
COPY ./src/style/default_layers.json       ./src/style/default_layers.json

RUN npm install
CMD npm run start

EXPOSE 9966