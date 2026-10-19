import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MockProvider } from './providers/mock.provider';
import { MtnMomoProvider } from './providers/mtn-momo.provider';
import { AirtelMoneyProvider } from './providers/airtel.provider';
@Injectable()
export class PaymentsService {
  private logger = new Logger(PaymentsService.name);
  private providers: Record<string, any> = { MOCK: new MockProvider(), MTN_MOMO: new MtnMomoProvider(), AIRTEL_MONEY: new AirtelMoneyProvider() };
  constructor(private prisma: PrismaService) {}
  async checkout(userId: string, dto: { planId?: string; eventId?: string; provider: string; amountCents: number; currency?: string; metadata?: any }) {
    const provider = this.providers[dto.provider] || this.providers['MOCK'];
    const paymentInit = await provider.createPayment(dto.amountCents, dto.currency || 'USD', dto.metadata);
    const order = await this.prisma.order.create({ data: { userId, planId: dto.planId, eventId: dto.eventId, type: dto.planId ? 'SUBSCRIPTION' : 'PPV', status: 'PENDING', amountCents: dto.amountCents, currency: dto.currency || 'USD', provider: dto.provider as any, providerOrderId: paymentInit.providerPaymentId, metadata: dto.metadata } });
    await this.prisma.payment.create({ data: { orderId: order.id, provider: dto.provider as any, providerPaymentId: paymentInit.providerPaymentId, amountCents: dto.amountCents, currency: dto.currency || 'USD', status: paymentInit.status } });
    return { order, payment: paymentInit };
  }
  async handleWebhook(provider: string, payload: any, signature: string) {
    const p = this.providers[provider.toUpperCase()] || this.providers['MOCK'];
    const ok = await p.verifyWebhook(payload, signature);
    if (!ok) throw new Error('Invalid webhook signature');
    const paymentId = payload.transactionId || payload.providerPaymentId || payload.id;
    const payment = await this.prisma.payment.findFirst({ where: { providerPaymentId: paymentId } });
    if (!payment) { this.logger.warn(`Webhook for unknown payment ${paymentId}`); return { ignored: true }; }
    const status = payload.status === 'SUCCESSFUL' || payload.status === 'COMPLETED' ? 'COMPLETED' : payload.status;
    await this.prisma.payment.update({ where: { id: payment.id }, data: { status, rawCallback: payload } });
    if (status === 'COMPLETED') await this.prisma.order.update({ where: { id: payment.orderId }, data: { status: 'COMPLETED' } });
    return { processed: true };
  }
  history(userId: string) { return this.prisma.order.findMany({ where: { userId }, include: { payments: true }, orderBy: { createdAt: 'desc' } }); }
}
