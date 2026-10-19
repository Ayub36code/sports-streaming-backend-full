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
exports.SportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SportsService = class SportsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    listActive() { return this.prisma.sport.findMany({ where: { isActive: true }, orderBy: { name: 'asc' } }); }
    listAll(q) { return this.prisma.sport.findMany({ where: q ? { name: { contains: q, mode: 'insensitive' } } : {}, orderBy: { name: 'asc' } }); }
    getById(id) { return this.prisma.sport.findUnique({ where: { id } }); }
    getBySlug(slug) { return this.prisma.sport.findUnique({ where: { slug } }); }
    async create(dto) { return this.prisma.sport.create({ data: dto }); }
    async update(id, dto) {
        const ex = await this.prisma.sport.findUnique({ where: { id } });
        if (!ex)
            throw new common_1.NotFoundException('Sport not found');
        return this.prisma.sport.update({ where: { id }, data: dto });
    }
    async delete(id) { return this.prisma.sport.update({ where: { id }, data: { isActive: false } }); }
};
exports.SportsService = SportsService;
exports.SportsService = SportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SportsService);
//# sourceMappingURL=sports.service.js.map