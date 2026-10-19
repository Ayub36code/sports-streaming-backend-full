import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}
  plans() { return this.prisma.subscriptionPlan.findMany({ where: { isActive: true }, orderBy: { priceCents: 'asc' } }); }
  async subscribe(userId: string, planId: string) {
    const plan = await this.prisma.subscriptionPlan.findUnique({ where: { id: planId } });
    if (!plan) throw new Error('Plan not found');
    const now = new Date(); const end = new Date(now);
    if (plan.interval === 'MONTHLY') end.setMonth(end.getMonth()+1);
    else if (plan.interval === 'ANNUAL') end.setFullYear(end.getFullYear()+1);
    else end.setDate(end.getDate()+7);
    const sub = await this.prisma.subscription.create({ data: { userId, planId, status: 'ACTIVE', startDate: now, endDate: end, renewsAt: end } });
    await this.prisma.entitlement.create({ data: { userId, planId, type: 'SUBSCRIPTION', startDate: now, endDate: end, isActive: true } });
    return sub;
  }
  userSubs(userId: string) { return this.prisma.subscription.findMany({ where: { userId }, include: { plan: true }, orderBy: { createdAt: 'desc' } }); }
}
