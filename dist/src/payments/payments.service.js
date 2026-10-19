"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PaymentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const mock_provider_1 = require("./providers/mock.provider");
const mtn_momo_provider_1 = require("./providers/mtn-momo.provider");
const airtel_provider_1 = require("./providers/airtel.provider");
let PaymentsService = PaymentsService_1 = class PaymentsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(PaymentsService_1.name);
        this.providers = { MOCK: new mock_provider_1.MockProvider(), MTN_MOMO: new mtn_momo_provider_1.MtnMomoProvider(), AIRTEL_MONEY: new airtel_provider_1.AirtelMoneyProvider() };
    }
    async checkout(userId, dto) {
        const provider = this.providers[dto.provider] || this.providers['MOCK'];
        const paymentInit = await provider.createPayment(dto.amountCents, dto.currency || 'USD', dto.metadata);
        const order = await this.prisma.order.create({ data: { userId, planId: dto.planId, eventId: dto.eventId, type: dto.planId ? 'SUBSCRIPTION' : 'PPV', status: 'PENDING', amountCents: dto.amountCents, currency: dto.currency || 'USD', provider: dto.provider, providerOrderId: paymentInit.providerPaymentId, metadata: dto.metadata } });
        await this.prisma.payment.create({ data: { orderId: order.id, provider: dto.provider, providerPaymentId: paymentInit.providerPaymentId, amountCents: dto.amountCents, currency: dto.currency || 'USD', status: paymentInit.status } });
        return { order, payment: paymentInit };
    }
    async handleWebhook(provider, payload, signature) {
        const p = this.providers[provider.toUpperCase()] || this.providers['MOCK'];
        const ok = await p.verifyWebhook(payload, signature);
        if (!ok)
            throw new Error('Invalid webhook signature');
        const paymentId = payload.transactionId || payload.providerPaymentId || payload.id;
        const payment = await this.prisma.payment.findFirst({ where: { providerPaymentId: paymentId } });
        if (!payment) {
            this.logger.warn(`Webhook for unknown payment ${paymentId}`);
            return { ignored: true };
        }
        const status = payload.status === 'SUCCESSFUL' || payload.status === 'COMPLETED' ? 'COMPLETED' : payload.status;
        await this.prisma.payment.update({ where: { id: payment.id }, data: { status, rawCallback: payload } });
        if (status === 'COMPLETED')
            await this.prisma.order.update({ where: { id: payment.orderId }, data: { status: 'COMPLETED' } });
        return { processed: true };
    }
    history(userId) { return this.prisma.order.findMany({ where: { userId }, include: { payments: true }, orderBy: { createdAt: 'desc' } }); }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = PaymentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map