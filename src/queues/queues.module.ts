import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('REDIS_HOST', 'localhost'),
          port: config.get('REDIS_PORT', 6379),
          url: config.get('REDIS_URL'),
        },
      }),
    }),
    BullModule.registerQueue(
      { name: 'notifications' },
      { name: 'video-processing' },
      { name: 'analytics' },
      { name: 'rights-sync' },
    ),
  ],
  exports: [BullModule],
})
export class QueuesModule {}