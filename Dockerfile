FROM node:12 as builder

WORKDIR /mapbox-gl-indoor-plugin

COPY . .

RUN npm install
CMD npm run start

EXPOSE 9966