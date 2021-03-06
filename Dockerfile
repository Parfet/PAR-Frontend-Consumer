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
COPY --from=build /build/tailwind.config.js ./tailwind.config.js
COPY --from=build /build/tsconfig.json ./tsconfig.json
COPY --from=build /build/next-env.d.ts ./next-env.d.ts
COPY --from=build /build/postcss.config.js ./postcss.config.js
COPY --from=build /build/.babelrc ./.babelrc
RUN yarn add next@11.1.2

EXPOSE 3002
CMD yarn start
