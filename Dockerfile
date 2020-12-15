FROM node:12 as builder

WORKDIR /map-gl-indoor

COPY ./package.json ./package.json
RUN npm install

COPY . .
RUN npm run build

# ########################################################
FROM abiosoft/caddy:1.0.3-no-stats

RUN mkdir -p /map-gl-indoor/dist

COPY --from=builder /map-gl-indoor/dist/map-gl-indoor.js    /map-gl-indoor/dist/map-gl-indoor.js
COPY ./examples/    /map-gl-indoor/
COPY ./debug/maps   /map-gl-indoor/maps
COPY ./Caddyfile    /etc/Caddyfile

CMD ["--conf", "/etc/Caddyfile", "--log", "stdout", "--agree=true"]

EXPOSE 80
