FROM node:12 as builder

WORKDIR /mapbox-gl-indoor

COPY ./package.json ./package.json
RUN npm install

COPY . .
RUN npm run build

# ########################################################
FROM abiosoft/caddy:1.0.3-no-stats

RUN mkdir -p /mapbox-gl-indoor/dist

COPY --from=builder /mapbox-gl-indoor/dist/mapbox-gl-indoor.js    /mapbox-gl-indoor/dist/mapbox-gl-indoor.js
COPY --from=builder /mapbox-gl-indoor/node_modules/mapbox-gl/dist /mapbox-gl-indoor/node_modules/mapbox-gl/dist
COPY ./examples/    /mapbox-gl-indoor/
COPY ./debug/maps   /mapbox-gl-indoor/maps
COPY ./Caddyfile    /etc/Caddyfile

CMD ["--conf", "/etc/Caddyfile", "--log", "stdout", "--agree=true"]

EXPOSE 80
