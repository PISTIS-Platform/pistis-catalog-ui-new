# Stage 1: Dependencies
FROM node:22.13-slim AS deps
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm i -g corepack@latest && \
    corepack prepare pnpm@9 && \
    corepack enable

# Copy only files needed for installation
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --no-frozen-lockfile

# Stage 2: Builder
FROM node:22.13-slim AS builder
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm i -g corepack@latest && \
    corepack prepare pnpm@9 && \
    corepack enable
COPY --from=deps /pnpm /pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set build arguments and environment
ENV NODE_OPTIONS=--max-old-space-size=8192
ENV NODE_ENV=production

# Build with verbose logging
RUN pnpm run build-with-piveau --debug

# Stage 3: Production
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN mkdir -p /var/cache/nginx/uwsgi_temp \
    /var/cache/nginx/client_temp \
    /var/cache/nginx/proxy_temp \
    /var/cache/nginx/fastcgi_temp \
    /var/cache/nginx/scgi_temp && \
    chmod g+rwx /var/cache/nginx /var/run /var/log/nginx /var/cache/nginx/client_temp

# Copy only the built assets and necessary files
COPY --from=builder /app/dist .
COPY --from=builder /app/dist/src ./assets/src
COPY --from=builder /app/nginx/nginx.vh.default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/runtimeconfig.sh /runtimeconfig.sh
COPY --from=builder /app/config/default.env /default.env

# Add this line to convert CRLF to LF
RUN apk add --no-cache bash gettext dos2unix && \
    dos2unix /runtimeconfig.sh && \
    dos2unix /default.env && \
    chmod +x /runtimeconfig.sh && \
    chmod -R a+rw .



EXPOSE 8080

# Use bash for the runtime script
CMD ["/bin/bash", "/runtimeconfig.sh"]


