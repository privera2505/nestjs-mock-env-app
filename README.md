# nestjs-mock-env-app

App mínima en NestJS que expone 3 variables de entorno (`APP_NAME`, `APP_ENV`, `APP_VERSION`) vía un endpoint HTTP. No usa base de datos.

## Endpoints

- `GET /` → `{ "status": "ok" }` (health check)
- `GET /config` → `{ "appName": "...", "appEnv": "...", "appVersion": "..." }`

## Ejecutar en local

```bash
npm install
cp .env.example .env
# exporta las variables o usa un cargador de .env de tu preferencia
export APP_NAME=demo-app APP_ENV=local APP_VERSION=1.0.0
npm run start:dev
```

## Tests

```bash
npm test
```

Incluye:
- `app.controller.spec.ts`: prueba el controlador **mockeando** `AppService` con `jest.fn()`.
- `app.service.spec.ts`: prueba el servicio real manipulando `process.env` (valores definidos y fallback a "no-definido").

## Ejecutar con Docker

```bash
docker build -t nestjs-mock-env-app .
docker run -p 3000:3000 \
  -e APP_NAME=demo-app \
  -e APP_ENV=production \
  -e APP_VERSION=1.0.0 \
  nestjs-mock-env-app
```

O con docker-compose:

```bash
docker compose up --build
```

Luego prueba:

```bash
curl http://localhost:3000/config
```
