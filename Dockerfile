FROM node:20.12.2-alpine3.18 AS base
RUN apk add --no-cache python3 make g++

# All deps stage
FROM base AS deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci

# Production only deps stage
FROM base AS production-deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci --omit=dev

# Build stage
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build

# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
EXPOSE 8080
COPY entrypoint.sh /app/entrypoint.sh
RUN mkdir -p /app/tmp
RUN chmod +x /app/entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["node", "./bin/server.js"]