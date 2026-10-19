import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
@Injectable()
export class NotificationsService {
  private logger = new Logger(NotificationsService.name);
  constructor(private prisma: PrismaService, @InjectQueue('notifications') private queue: Queue) {}
  async sendToUser(userId: string, type: string, title: string, body?: string, data?: any) {
    const notif = await this.prisma.notification.create({ data: { userId, type, title, body, data } });
    await this.queue.add('send', { notificationId: notif.id, userId, type }, { attempts: 3 });
    return notif;
  }
  async scheduleEventReminder(eventId: string) {
    const event = await this.prisma.event.findUnique({ where: { id: eventId } });
    if (!event) return;
    const remindAt = new Date(event.scheduledAt.getTime() - 15*60*1000);
    if (remindAt > new Date()) await this.queue.add('event-reminder', { eventId }, { delay: remindAt.getTime() - Date.now() });
  }
  list(userId: string) { return this.prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 50 }); }
  async markRead(userId: string, id: string) { return this.prisma.notification.updateMany({ where: { id, userId }, data: { isRead: true } }); }
}
