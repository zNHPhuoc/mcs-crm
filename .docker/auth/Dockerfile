# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only package files first for caching
COPY services/auth/package.json ./
COPY services/auth/yarn.lock ./

RUN yarn install --frozen-lockfile

# Copy source code
COPY services/auth ./

RUN yarn build


# Stage 2: authion runtime
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .

EXPOSE 3000

CMD ["node", "dist/main.js"]
