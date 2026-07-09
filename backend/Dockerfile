FROM node:20-alpine AS build

WORKDIR /app

RUN corepack enable

# Copy workspace config and package files
COPY pnpm-workspace.yaml package.json ./
COPY shared/package.json shared/
COPY backend/package.json backend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY shared/ shared/
COPY backend/ backend/

# Build
RUN pnpm --filter aibox-backend build

# ===== Runtime =====
FROM node:20-alpine AS serve

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/backend/dist ./dist
COPY --from=build /app/backend/package.json ./package.json

EXPOSE 3001

CMD ["node", "dist/backend/src/index.js"]
