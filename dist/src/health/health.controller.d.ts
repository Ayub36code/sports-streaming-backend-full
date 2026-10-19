import { HealthCheckService, PrismaHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
export declare class HealthController {
    private health;
    private prismaHealth;
    private memory;
    private prisma;
    private redis;
    constructor(health: HealthCheckService, prismaHealth: PrismaHealthIndicator, memory: MemoryHealthIndicator, prisma: PrismaService, redis: RedisService);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
    ready(): {
        status: string;
        timestamp: string;
        service: string;
    };
}
