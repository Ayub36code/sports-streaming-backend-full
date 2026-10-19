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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true, email: true, role: true, displayName: true, firstName: true, lastName: true, countryCode: true, language: true, timezone: true, avatarUrl: true, emailVerified: true, createdAt: true } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async update(id, dto) { return this.prisma.user.update({ where: { id }, data: dto, select: { id: true, email: true, displayName: true, countryCode: true, language: true, timezone: true } }); }
    async list(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([this.prisma.user.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }), this.prisma.user.count()]);
        return { items, total, page, limit };
    }
    async deleteUser(id) {
        await this.prisma.user.update({ where: { id }, data: { email: `deleted_${id}@deleted.local`, isActive: false, firstName: 'Deleted', lastName: 'User', displayName: 'Deleted User', avatarUrl: null } });
        await this.prisma.refreshToken.updateMany({ where: { userId: id }, data: { isRevoked: true } });
        await this.prisma.userSession.updateMany({ where: { userId: id }, data: { isRevoked: true } });
        return { deleted: true };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map