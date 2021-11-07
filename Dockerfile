FROM node:16.5.0-alpine AS base
WORKDIR /base
COPY package*.json ./
RUN yarn
RUN yarn add --dev typescript
COPY . .

FROM base AS build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
RUN yarn build

FROM node:16.5.0-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
COPY --from=build /build/next.config.js ./next.config.js
RUN yarn add next@11.1.2

EXPOSE 3002
CMD yarn start
