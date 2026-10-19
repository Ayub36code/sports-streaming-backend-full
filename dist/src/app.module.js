"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const nestjs_pino_1 = require("nestjs-pino");
const prisma_module_1 = require("./prisma/prisma.module");
const redis_module_1 = require("./redis/redis.module");
const health_module_1 = require("./health/health.module");
const queues_module_1 = require("./queues/queues.module");
const common_module_1 = require("./common/common.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const sports_module_1 = require("./sports/sports.module");
const organizations_module_1 = require("./organizations/organizations.module");
const competitions_module_1 = require("./competitions/competitions.module");
const teams_module_1 = require("./teams/teams.module");
const athletes_module_1 = require("./athletes/athletes.module");
const venues_module_1 = require("./venues/venues.module");
const events_module_1 = require("./events/events.module");
const streaming_module_1 = require("./streaming/streaming.module");
const video_assets_module_1 = require("./video-assets/video-assets.module");
const rights_module_1 = require("./rights-management/rights.module");
const entitlements_module_1 = require("./entitlements/entitlements.module");
const subscriptions_module_1 = require("./subscriptions/subscriptions.module");
const payments_module_1 = require("./payments/payments.module");
const favorites_module_1 = require("./favorites/favorites.module");
const notifications_module_1 = require("./notifications/notifications.module");
const search_module_1 = require("./search/search.module");
const analytics_module_1 = require("./analytics/analytics.module");
const audit_module_1 = require("./audit/audit.module");
const admin_module_1 = require("./admin/admin.module");
const throttler_behind_proxy_guard_1 = require("./common/guards/throttler-behind-proxy.guard");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const configuration_1 = require("./config/configuration");
const validation_1 = require("./config/validation");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, load: [configuration_1.default], validationSchema: validation_1.validationSchema, validationOptions: { allowUnknown: true, abortEarly: false } }),
            nestjs_pino_1.LoggerModule.forRoot({ pinoHttp: { level: process.env.LOG_LEVEL || 'info', transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined } }),
            throttler_1.ThrottlerModule.forRoot([{ ttl: parseInt(process.env.RATE_LIMIT_TTL || '60000', 10), limit: parseInt(process.env.RATE_LIMIT_MAX || '100', 10) }]),
            prisma_module_1.PrismaModule, redis_module_1.RedisModule, health_module_1.HealthModule, queues_module_1.QueuesModule, common_module_1.CommonModule,
            auth_module_1.AuthModule, users_module_1.UsersModule, sports_module_1.SportsModule, organizations_module_1.OrganizationsModule, competitions_module_1.CompetitionsModule, teams_module_1.TeamsModule, athletes_module_1.AthletesModule, venues_module_1.VenuesModule, events_module_1.EventsModule,
            streaming_module_1.StreamingModule, video_assets_module_1.VideoAssetsModule, rights_module_1.RightsModule, entitlements_module_1.EntitlementsModule, subscriptions_module_1.SubscriptionsModule, payments_module_1.PaymentsModule, favorites_module_1.FavoritesModule, notifications_module_1.NotificationsModule,
            search_module_1.SearchModule, analytics_module_1.AnalyticsModule, audit_module_1.AuditModule, admin_module_1.AdminModule,
        ],
        providers: [
            { provide: core_1.APP_GUARD, useClass: throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard },
            { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map