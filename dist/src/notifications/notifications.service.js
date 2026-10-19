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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
let NotificationsService = NotificationsService_1 = class NotificationsService {
    constructor(prisma, queue) {
        this.prisma = prisma;
        this.queue = queue;
        this.logger = new common_1.Logger(NotificationsService_1.name);
    }
    async sendToUser(userId, type, title, body, data) {
        const notif = await this.prisma.notification.create({ data: { userId, type, title, body, data } });
        await this.queue.add('send', { notificationId: notif.id, userId, type }, { attempts: 3 });
        return notif;
    }
    async scheduleEventReminder(eventId) {
        const event = await this.prisma.event.findUnique({ where: { id: eventId } });
        if (!event)
            return;
        const remindAt = new Date(event.scheduledAt.getTime() - 15 * 60 * 1000);
        if (remindAt > new Date())
            await this.queue.add('event-reminder', { eventId }, { delay: remindAt.getTime() - Date.now() });
    }
    list(userId) { return this.prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 50 }); }
    async markRead(userId, id) { return this.prisma.notification.updateMany({ where: { id, userId }, data: { isRead: true } }); }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = NotificationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, bullmq_1.InjectQueue)('notifications')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, bullmq_2.Queue])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map