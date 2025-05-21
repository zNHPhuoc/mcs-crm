# -------- Base Stage --------
FROM node:20.15.0 AS base

WORKDIR /app
COPY services/frontend/package*.json ./
RUN yarn install
COPY services/frontend .

# -------- Development Stage --------
FROM base AS development

EXPOSE 5173
CMD ["yarn", "dev", "--host"]

# -------- Production Stage --------
FROM base AS builder
RUN yarn build


FROM nginx:stable-alpine AS production

# Optional: Custom nginx config (for history mode)
COPY .docker/frontend/vue/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
