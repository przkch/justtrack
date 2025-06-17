FROM node:23 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

FROM base AS prod-deps

COPY package.json pnpm-lock.yaml /app/

RUN pnpm install --prod --frozen-lockfile

FROM base AS build

COPY . /app/

RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM base

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build

USER node
ENV NODE_ENV=production

ENV PORT=3000
EXPOSE 3000

CMD ["node", "build"]