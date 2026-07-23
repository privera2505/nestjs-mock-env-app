# --- Etapa de build ---
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# --- Etapa de ejecución ---
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist

# Valores por defecto (se pueden sobreescribir con -e o docker-compose)
ENV APP_NAME=mock-app
ENV APP_ENV=production
ENV APP_VERSION=1.0.0
ENV PORT=8000

EXPOSE 8000

CMD ["node", "dist/main.js"]
