FROM node:23 AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=base /app/dist ./dist

USER node
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD ["node", "build"]