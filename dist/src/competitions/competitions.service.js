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
exports.CompetitionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CompetitionsService = class CompetitionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    list(filters) {
        const where = {};
        if (filters.sportId)
            where.sportId = filters.sportId;
        if (filters.countryCode)
            where.countryCode = filters.countryCode;
        if (filters.q)
            where.name = { contains: filters.q, mode: 'insensitive' };
        return this.prisma.competition.findMany({ where, include: { sport: true }, orderBy: { name: 'asc' }, take: filters.limit || 50, skip: filters.skip || 0 });
    }
    get(id) { return this.prisma.competition.findUnique({ where: { id }, include: { sport: true, seasons: true } }); }
    create(data) { return this.prisma.competition.create({ data }); }
    update(id, data) { return this.prisma.competition.update({ where: { id }, data }); }
};
exports.CompetitionsService = CompetitionsService;
exports.CompetitionsService = CompetitionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CompetitionsService);
//# sourceMappingURL=competitions.service.js.map