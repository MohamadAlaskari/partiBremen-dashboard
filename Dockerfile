FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run confbuild

FROM node:18-alpine

WORKDIR /usr/app
COPY --from=builder /app/dist/parti-bremen-dashboard/server ./
CMD node server.mjs

EXPOSE 80



