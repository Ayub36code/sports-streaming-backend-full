import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}
  async track(userId: string | null, eventId: string | null, type: string, value?: number, metadata?: any) {
    return this.prisma.analyticsEvent.create({ data: { userId, eventId, type, value, metadata } });
  }
  async overview() {
    const [totalEvents, totalUsers, activePlayback, revenue] = await Promise.all([
      this.prisma.event.count(),
      this.prisma.user.count(),
      this.prisma.playbackSession.count({ where: { isActive: true } }),
      this.prisma.order.aggregate({ _sum: { amountCents: true }, where: { status: 'COMPLETED' } }),
    ]);
    return { totalEvents, totalUsers, activePlayback, revenueCents: revenue._sum.amountCents || 0 };
  }
}
