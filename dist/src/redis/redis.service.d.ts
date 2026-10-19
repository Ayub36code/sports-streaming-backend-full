import { OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
export declare class RedisService implements OnModuleDestroy {
    private config;
    private readonly logger;
    readonly client: Redis;
    constructor(config: ConfigService);
    onModuleDestroy(): Promise<void>;
    get(key: string): Promise<string>;
    set(key: string, value: string, ttlSec?: number): Promise<"OK">;
    del(key: string): Promise<number>;
}
