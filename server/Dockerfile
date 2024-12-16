
FROM node:22.12.0-alpine3.21 AS builder

WORKDIR /build

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY . .
RUN npm run build

FROM node:22.12.0-alpine3.21 AS runner

WORKDIR /app/server

COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json ./package.json
COPY --from=builder /build/package-lock.json ./package-lock.json
COPY --from=builder /build/dist ./dist

CMD ["npm", "run", "start:prod"]
