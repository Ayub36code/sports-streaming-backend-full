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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EventsService = class EventsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(filters) {
        const where = { isPublished: filters.isPublished !== undefined ? filters.isPublished : true };
        if (filters.sportId)
            where.sportId = filters.sportId;
        if (filters.competitionId)
            where.competitionId = filters.competitionId;
        if (filters.status)
            where.status = filters.status;
        if (filters.from)
            where.scheduledAt = { gte: new Date(filters.from) };
        if (filters.to)
            where.scheduledAt = { ...where.scheduledAt, lte: new Date(filters.to) };
        if (filters.teamId)
            where.participants = { some: { teamId: filters.teamId } };
        if (filters.athleteId)
            where.participants = { some: { athleteId: filters.athleteId } };
        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 20;
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            this.prisma.event.findMany({ where, include: { sport: true, competition: true, venue: true, participants: { include: { team: true, athlete: true } } }, orderBy: { scheduledAt: filters.sortOrder === 'asc' ? 'asc' : 'desc' }, skip, take: limit }),
            this.prisma.event.count({ where }),
        ]);
        return { items, total, page, limit };
    }
    live() { return this.prisma.event.findMany({ where: { status: 'LIVE', isPublished: true }, include: { sport: true, competition: true } }); }
    upcoming() { return this.prisma.event.findMany({ where: { status: 'SCHEDULED', isPublished: true, scheduledAt: { gte: new Date() } }, orderBy: { scheduledAt: 'asc' }, take: 20 }); }
    async get(id) {
        const ev = await this.prisma.event.findUnique({ where: { id }, include: { sport: true, competition: true, season: true, venue: true, participants: { include: { team: true, athlete: true } }, results: true, streams: { include: { stream: true } } } });
        if (!ev)
            throw new common_1.NotFoundException('Event not found');
        return ev;
    }
    async create(dto) { return this.prisma.event.create({ data: { ...dto, scheduledAt: new Date(dto.scheduledAt) } }); }
    async update(id, dto) { if (dto.scheduledAt)
        dto.scheduledAt = new Date(dto.scheduledAt); return this.prisma.event.update({ where: { id }, data: dto }); }
    async results(id) { return this.prisma.eventResult.findMany({ where: { eventId: id } }); }
    async addParticipant(eventId, data) { return this.prisma.eventParticipant.create({ data: { ...data, eventId } }); }
    async addResult(eventId, data) { return this.prisma.eventResult.create({ data: { ...data, eventId } }); }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventsService);
//# sourceMappingURL=events.service.js.map