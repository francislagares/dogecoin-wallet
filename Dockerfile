# Linux + Node + Source + Project dependencies
FROM node:16-alpine as base
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

# Linux + Node + Source + Project dependencies + build assets
FROM base AS build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /app ./
RUN yarn build

# We keep some artifacts from build
FROM build AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
RUN yarn add next

EXPOSE 3000
CMD yarn start
