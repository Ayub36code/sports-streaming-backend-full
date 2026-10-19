# Global Multi-Sport Streaming Platform - Backend (Stage 1)

## Stack
NestJS + TypeScript + Prisma + PostgreSQL + Redis + BullMQ + Pino + Swagger

## Quick Start

```bash
cp .env.example .env
# edit secrets in .env

docker-compose up -d postgres redis
npm install
npx prisma migrate dev --name init
npm run prisma:seed
npm run start:dev
```

API: http://localhost:3000/api/v1
Swagger: http://localhost:3000/api/docs
Health: http://localhost:3000/api/v1/health
Bull Board: http://localhost:3000/api/v1/queues

## Stage 1 Deliverables
- Modular monolith skeleton with module boundaries
- Config module with validation
- Prisma schema covering all future models (normalized, indexed)
- Redis service for caching/rate limiting
- Pino structured logger
- Global validation, CORS, Helmet, versioning /api/v1
- Health checks for DB and Redis
- BullMQ setup
- Docker + Docker Compose
- Swagger/OpenAPI