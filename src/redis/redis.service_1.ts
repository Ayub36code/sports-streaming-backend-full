import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  public readonly client: Redis;

  constructor(private config: ConfigService) {
    const url = this.config.get<string>('REDIS_URL');
    if (url) {
      this.client = new Redis(url, { maxRetriesPerRequest: 3 });
    } else {
      const host = this.config.get<string>('REDIS_HOST', 'localhost');
      const port = this.config.get<number>('REDIS_PORT', 6379);
      this.client = new Redis({ host, port, maxRetriesPerRequest: 3 });
    }
    this.client.on('connect', () => this.logger.log('Redis connected'));
    this.client.on('error', (e) => this.logger.error('Redis error', e));
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  async get(key: string) { return this.client.get(key); }
  async set(key: string, value: string, ttlSec?: number) {
    if (ttlSec) return this.client.set(key, value, 'EX', ttlSec);
    return this.client.set(key, value);
  }
  async del(key: string) { return this.client.del(key); }
}