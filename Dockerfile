# Stage 1: Build stage
FROM node:22.13-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm i -g corepack@latest
RUN corepack prepare pnpm@9
RUN corepack enable
COPY . .

FROM base AS prod-deps
RUN pnpm install --prod

FROM base AS build
RUN pnpm install --no-frozen-lockfile
RUN pnpm run build-with-piveau

# Stage 2: Production stage
FROM nginx:alpine
EXPOSE 8080

RUN mkdir /var/cache/nginx/uwsgi_temp && \
    mkdir /var/cache/nginx/client_temp && \
    mkdir /var/cache/nginx/proxy_temp && \
    mkdir /var/cache/nginx/fastcgi_temp && \
    mkdir /var/cache/nginx/scgi_temp && \
    chmod g+rwx /var/cache/nginx /var/run /var/log/nginx /var/cache/nginx/client_temp

COPY --from=prod-deps /node_modules /app/node_modules
COPY --from=build /dist /usr/share/nginx/html
# workaround to overcome some broken links e.g. hof-lp-header-background.jpg found under localhost:80/assets/src/assets/images
# instead of localhost:80/src/assets/images
# same for fonts .. not clear yet why it works sometimes and why not othertimes
COPY --from=build /dist/src /usr/share/nginx/html/assets/src
COPY --from=build /nginx/nginx.vh.default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /runtimeconfig.sh /runtimeconfig.sh
COPY --from=build /config/default.env /default.env

RUN chmod +x /runtimeconfig.sh && \
    chmod a+rw /usr/share/nginx/html/ && \
    chmod a+rw /usr/share/nginx/html/*.png && \
    chmod a+rw /usr/share/nginx/html/assets && \
    chmod a+rw /usr/share/nginx/html/assets/* && \
    chmod a+rw /usr/share/nginx/html/src && \
    chmod a+rw /usr/share/nginx/html/src/assets && \
    chmod a+rw /usr/share/nginx/html/src/assets/icons && \
    chmod a+rw /usr/share/nginx/html/src/assets/images && \
    chmod a+rw /usr/share/nginx/html/src/assets/images/*

CMD [ "/runtimeconfig.sh" ]
