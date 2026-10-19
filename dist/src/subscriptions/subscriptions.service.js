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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SubscriptionsService = class SubscriptionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    plans() { return this.prisma.subscriptionPlan.findMany({ where: { isActive: true }, orderBy: { priceCents: 'asc' } }); }
    async subscribe(userId, planId) {
        const plan = await this.prisma.subscriptionPlan.findUnique({ where: { id: planId } });
        if (!plan)
            throw new Error('Plan not found');
        const now = new Date();
        const end = new Date(now);
        if (plan.interval === 'MONTHLY')
            end.setMonth(end.getMonth() + 1);
        else if (plan.interval === 'ANNUAL')
            end.setFullYear(end.getFullYear() + 1);
        else
            end.setDate(end.getDate() + 7);
        const sub = await this.prisma.subscription.create({ data: { userId, planId, status: 'ACTIVE', startDate: now, endDate: end, renewsAt: end } });
        await this.prisma.entitlement.create({ data: { userId, planId, type: 'SUBSCRIPTION', startDate: now, endDate: end, isActive: true } });
        return sub;
    }
    userSubs(userId) { return this.prisma.subscription.findMany({ where: { userId }, include: { plan: true }, orderBy: { createdAt: 'desc' } }); }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map