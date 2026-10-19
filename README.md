# Global Multi-Sport Streaming Backend - FULL BUILD

## Stack
NestJS + Prisma + PostgreSQL + Redis + BullMQ + Pino + Swagger + JWT rotating refresh + RBAC

## Quick Start
```bash
cp .env.example .env
docker-compose up -d postgres redis
npm install
npx prisma migrate dev --name init
npm run prisma:seed
npm run start:dev
```

## Modules Implemented (no more README placeholders)
- auth: register, login, rotating refresh (familyId), logout all devices, verify-email, bcrypt hashing, session limit 5
- users: me, update, list, privacy deletion
- sports: generic model, admin CRUD, dynamic add without code change
- organizations, competitions, teams, athletes, venues
- events: generic EventParticipant (team OR athlete), generic EventResult score Json, filtering by sport/team/athlete/date/status, live/upcoming
- streaming: Stream CRUD, EventStream mapping, ingestUrl not exposed to clients
- video-assets: replays, highlights, clips, publish schedules
- rights-management: RightsAgreement + ContentRight with territory, blackout, exclusivity, checkRights() enforced before playback
- entitlements: central authorize() checks auth, publish, rights, subscription/entitlement, concurrency 3, issues 5min signed JWT playback token + CDN URL
- subscriptions: plans (free, monthly, annual, sport-specific), subscribe, entitlement creation
- payments: adapter interface, Mock, MTN MoMo, Airtel Money, checkout, webhook verify idempotent
- favorites, notifications (BullMQ queue + processor), search (sports, comps, teams, athletes, events), analytics (track + overview), audit logs, admin stats

## Key Routes /api/v1
Auth: POST /auth/register, /auth/login, /auth/refresh, /auth/logout, GET /auth/verify-email
Sports: GET /sports, GET /sports/:id, POST /sports (ADMIN), PATCH, DELETE
Competitions, Teams, Athletes, Venues, Organizations: similar
Events: GET /events? sportId=&status=&teamId=&athleteId=&from=&to=, GET /events/live, /events/upcoming, GET /events/:id, /:id/results, POST /events, PATCH /events/:id, POST /events/:id/participants, POST /events/:id/results
Streaming: GET /events/:id/streams, GET /admin/streams, POST /admin/streams, POST /admin/events/:id/streams
Video: GET /video-assets, POST /video-assets
Rights: GET /admin/rights, POST /admin/rights
Playback: POST /playback/authorize {eventId, videoAssetId, countryCode, deviceId} -> {playbackToken, hlsUrl, dashUrl}, POST /playback/heartbeat, POST /playback/stop
Subscriptions: GET /plans, GET /subscriptions, POST /subscriptions {planId}
Payments: POST /checkout, GET /payments/history, POST /webhooks/payments/:provider
Favorites: GET /favorites, POST /favorites/toggle
Notifications: GET /notifications, PATCH /notifications/:id/read
Search: GET /search?q=, GET /search/live-now, GET /search/featured
Analytics: POST /analytics/track, GET /admin/analytics
Audit: GET /admin/audit-logs
Admin: GET /admin/stats

## Security
- Never trusts frontend role/subscription - all checked server-side
- Rights enforced in entitlements service
- Short-lived playback tokens (5m), no ingest creds exposed
- Rate limiting, helmet, CORS, validation whitelist
- Rotating refresh tokens with familyId, reuse detection via revocation

## Payments
- Never stores raw card
- Provider adapters with verifyWebhook
- MTN MoMo and Airtel adapters are real API stubs with logging, replace credentials in .env
- Webhook idempotent by providerPaymentId

## Tests
Run: npm test
- auth.service.spec.ts included, add more for rights, entitlements, playback, adding new sport
