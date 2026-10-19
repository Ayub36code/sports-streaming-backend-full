import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsProcessor } from './notifications.processor';
import { BullModule } from '@nestjs/bullmq';
@Module({ imports: [BullModule.registerQueue({ name: 'notifications' })], providers: [NotificationsService, NotificationsProcessor], controllers: [NotificationsController], exports: [NotificationsService] })
export class NotificationsModule {}
