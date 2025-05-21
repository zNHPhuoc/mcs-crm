FROM node:20-alpine AS builder

WORKDIR /app

COPY ../../services/mail/package.json .
COPY ../../services/mail/yarn.lock .

RUN yarn install --frozen-lockfile

COPY ../../services/auth .

RUN yarn build


FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .

EXPOSE 3000

CMD ["node", "dist/main.js"]
