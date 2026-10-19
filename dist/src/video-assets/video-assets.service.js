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
exports.VideoAssetsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VideoAssetsService = class VideoAssetsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    list(filters) {
        const where = {};
        if (filters.type)
            where.type = filters.type;
        if (filters.eventId)
            where.eventId = filters.eventId;
        if (filters.isPublished !== undefined)
            where.isPublished = filters.isPublished === 'true';
        return this.prisma.videoAsset.findMany({ where, orderBy: { createdAt: 'desc' }, take: 50 });
    }
    get(id) { return this.prisma.videoAsset.findUnique({ where: { id } }); }
    create(data) { return this.prisma.videoAsset.create({ data }); }
    update(id, data) { return this.prisma.videoAsset.update({ where: { id }, data }); }
};
exports.VideoAssetsService = VideoAssetsService;
exports.VideoAssetsService = VideoAssetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VideoAssetsService);
//# sourceMappingURL=video-assets.service.js.map