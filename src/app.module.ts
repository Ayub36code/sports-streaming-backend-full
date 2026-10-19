import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { HealthModule } from './health/health.module';
import { QueuesModule } from './queues/queues.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SportsModule } from './sports/sports.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { TeamsModule } from './teams/teams.module';
import { AthletesModule } from './athletes/athletes.module';
import { VenuesModule } from './venues/venues.module';
import { EventsModule } from './events/events.module';
import { StreamingModule } from './streaming/streaming.module';
import { VideoAssetsModule } from './video-assets/video-assets.module';
import { RightsModule } from './rights-management/rights.module';
import { EntitlementsModule } from './entitlements/entitlements.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { PaymentsModule } from './payments/payments.module';
import { FavoritesModule } from './favorites/favorites.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SearchModule } from './search/search.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AuditModule } from './audit/audit.module';
import { AdminModule } from './admin/admin.module';
import { ThrottlerBehindProxyGuard } from './common/guards/throttler-behind-proxy.guard';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration], validationSchema, validationOptions: { allowUnknown: true, abortEarly: false } }),
    LoggerModule.forRoot({ pinoHttp: { level: process.env.LOG_LEVEL || 'info', transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined } }),
    ThrottlerModule.forRoot([{ ttl: parseInt(process.env.RATE_LIMIT_TTL || '60000', 10), limit: parseInt(process.env.RATE_LIMIT_MAX || '100', 10) }]),
    PrismaModule, RedisModule, HealthModule, QueuesModule, CommonModule,
    AuthModule, UsersModule, SportsModule, OrganizationsModule, CompetitionsModule, TeamsModule, AthletesModule, VenuesModule, EventsModule,
    StreamingModule, VideoAssetsModule, RightsModule, EntitlementsModule, SubscriptionsModule, PaymentsModule, FavoritesModule, NotificationsModule,
    SearchModule, AnalyticsModule, AuditModule, AdminModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerBehindProxyGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
