FROM node:20-alpine AS build

WORKDIR /app

RUN corepack enable

# Copy workspace config and package files
COPY pnpm-workspace.yaml package.json ./
COPY shared/package.json shared/
COPY frontend/package.json frontend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY shared/ shared/
COPY frontend/ frontend/

# Build
RUN pnpm --filter aibox-frontend build

# ===== Runtime =====
FROM nginx:alpine AS serve

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
