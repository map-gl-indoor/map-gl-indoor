FROM node:12 as builder

WORKDIR /mapbox-gl-indoor-plugin

COPY ./package.json ./package.json
RUN npm install

COPY . .
RUN npm run build

# ########################################################
FROM abiosoft/caddy:1.0.3-no-stats

RUN mkdir -p /mapbox-gl-indoor-plugin/dist

COPY ./examples/                                                      /mapbox-gl-indoor-plugin/
COPY --from=builder /mapbox-gl-indoor-plugin/dist/mapbox-gl-indoor.js /mapbox-gl-indoor-plugin/dist/mapbox-gl-indoor.js

COPY ./Caddyfile /etc/Caddyfile

CMD ["--conf", "/etc/Caddyfile", "--log", "stdout", "--agree=true"]

EXPOSE 9966