FROM node:14.16.0-alpine AS base
WORKDIR /base
COPY package.json yarn.lock ./
RUN yarn
RUN yarn add --dev typescript
COPY . .

FROM base AS build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
RUN yarn build

FROM node:14.16.0-alpine AS production
ENV NODE_ENV=production
WORKDIR /app 
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
COPY --form=build /build/node_modules ./node_modules
RUN yarn add next

CMD ["yarn","build"]
CMD ["yarn","staging"]