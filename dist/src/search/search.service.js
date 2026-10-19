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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SearchService = class SearchService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async search(q) {
        if (!q || q.length < 2)
            return { sports: [], competitions: [], teams: [], athletes: [], events: [] };
        const contains = { contains: q, mode: 'insensitive' };
        const [sports, competitions, teams, athletes, events] = await Promise.all([
            this.prisma.sport.findMany({ where: { name: contains }, take: 5 }),
            this.prisma.competition.findMany({ where: { name: contains }, take: 5 }),
            this.prisma.team.findMany({ where: { name: contains }, take: 5 }),
            this.prisma.athlete.findMany({ where: { OR: [{ firstName: contains }, { lastName: contains }, { displayName: contains }] }, take: 5 }),
            this.prisma.event.findMany({ where: { title: contains, isPublished: true }, take: 10, orderBy: { scheduledAt: 'desc' } }),
        ]);
        return { sports, competitions, teams, athletes, events };
    }
    async liveNow() { return this.prisma.event.findMany({ where: { status: 'LIVE', isPublished: true }, include: { sport: true }, take: 20 }); }
    async featured() { return this.prisma.event.findMany({ where: { isPublished: true, scheduledAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }, orderBy: { scheduledAt: 'desc' }, take: 10 }); }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SearchService);
//# sourceMappingURL=search.service.js.map