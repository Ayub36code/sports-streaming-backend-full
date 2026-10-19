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
exports.RightsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RightsService = class RightsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    list() { return this.prisma.rightsAgreement.findMany({ include: { contentRights: { include: { territory: true } } }, orderBy: { createdAt: 'desc' } }); }
    create(data) { return this.prisma.rightsAgreement.create({ data }); }
    async checkRights(params) {
        const territory = await this.prisma.territory.findUnique({ where: { code: params.territoryCode } });
        if (!territory)
            return false;
        const now = new Date();
        const rights = await this.prisma.contentRight.findMany({
            where: { territoryId: territory.id, isAllowed: true, contentType: { in: [params.contentType, 'ALL'] }, agreement: { status: 'ACTIVE', startDate: { lte: now }, endDate: { gte: now } } },
            include: { agreement: true },
        });
        const filtered = rights.filter(r => {
            if (params.eventId && r.eventId && r.eventId !== params.eventId)
                return false;
            if (params.videoAssetId && r.videoAssetId && r.videoAssetId !== params.videoAssetId)
                return false;
            return true;
        });
        if (filtered.length === 0)
            return false;
        for (const r of filtered) {
            if (r.blackoutStart && r.blackoutEnd && now >= r.blackoutStart && now <= r.blackoutEnd)
                continue;
            return true;
        }
        return false;
    }
};
exports.RightsService = RightsService;
exports.RightsService = RightsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RightsService);
//# sourceMappingURL=rights.service.js.map