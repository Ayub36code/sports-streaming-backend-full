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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
const crypto_1 = require("crypto");
let AuthService = AuthService_1 = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    hashToken(token) { return (0, crypto_1.createHash)('sha256').update(token).digest('hex'); }
    async register(dto) {
        const exists = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } });
        if (exists)
            throw new common_1.ConflictException('Email already registered');
        const rounds = parseInt(this.config.get('BCRYPT_ROUNDS') || '12', 10);
        const passwordHash = await bcrypt.hash(dto.password, rounds);
        const verificationToken = (0, uuid_1.v4)();
        const user = await this.prisma.user.create({
            data: {
                email: dto.email.toLowerCase(),
                passwordHash,
                firstName: dto.firstName,
                lastName: dto.lastName,
                displayName: dto.firstName ? `${dto.firstName} ${dto.lastName || ''}`.trim() : dto.email.split('@')[0],
                countryCode: dto.countryCode?.toUpperCase(),
                emailVerificationToken: verificationToken,
            },
            select: { id: true, email: true, role: true, displayName: true, countryCode: true, emailVerified: true },
        });
        this.logger.log(`Registered ${user.email} verification token ${verificationToken}`);
        return { user, verificationToken };
    }
    async login(dto, meta) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } });
        if (!user || !user.isActive || user.isBlocked)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const ok = await bcrypt.compare(dto.password, user.passwordHash);
        if (!ok)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const activeSessions = await this.prisma.userSession.count({ where: { userId: user.id, isRevoked: false, expiresAt: { gt: new Date() } } });
        if (activeSessions >= 5) {
            const oldest = await this.prisma.userSession.findFirst({ where: { userId: user.id, isRevoked: false }, orderBy: { createdAt: 'asc' } });
            if (oldest)
                await this.prisma.userSession.update({ where: { id: oldest.id }, data: { isRevoked: true } });
        }
        const sessionId = (0, uuid_1.v4)();
        const familyId = (0, uuid_1.v4)();
        const accessPayload = { sub: user.id, email: user.email, role: user.role, sid: sessionId };
        const accessToken = this.jwt.sign(accessPayload, {
            secret: this.config.get('JWT_ACCESS_SECRET') || this.config.get('jwt.accessSecret'),
            expiresIn: this.config.get('JWT_ACCESS_EXPIRES_IN') || '15m',
        });
        const refreshToken = this.jwt.sign({ sub: user.id, family: familyId }, {
            secret: this.config.get('JWT_REFRESH_SECRET') || this.config.get('jwt.refreshSecret'),
            expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN') || '7d',
        });
        const hashed = this.hashToken(refreshToken);
        await this.prisma.refreshToken.create({
            data: { userId: user.id, tokenHash: hashed, familyId, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
        });
        await this.prisma.userSession.create({
            data: { id: sessionId, userId: user.id, ipAddress: meta.ip, userAgent: meta.userAgent, deviceInfo: meta.deviceInfo, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
        });
        await this.prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
        return { accessToken, refreshToken, user: { id: user.id, email: user.email, role: user.role, displayName: user.displayName } };
    }
    async refresh(oldRefreshToken) {
        const hashed = this.hashToken(oldRefreshToken);
        const stored = await this.prisma.refreshToken.findUnique({ where: { tokenHash: hashed } });
        if (!stored || stored.isRevoked || stored.expiresAt < new Date())
            throw new common_1.UnauthorizedException('Invalid refresh token');
        await this.prisma.refreshToken.update({ where: { id: stored.id }, data: { isRevoked: true } });
        const user = await this.prisma.user.findUnique({ where: { id: stored.userId } });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const sessionId = (0, uuid_1.v4)();
        const accessToken = this.jwt.sign({ sub: user.id, email: user.email, role: user.role, sid: sessionId }, {
            secret: this.config.get('JWT_ACCESS_SECRET'),
            expiresIn: this.config.get('JWT_ACCESS_EXPIRES_IN') || '15m',
        });
        const newRefresh = this.jwt.sign({ sub: user.id, family: stored.familyId }, {
            secret: this.config.get('JWT_REFRESH_SECRET'),
            expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN') || '7d',
        });
        await this.prisma.refreshToken.create({
            data: { userId: user.id, tokenHash: this.hashToken(newRefresh), familyId: stored.familyId, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
        });
        await this.prisma.userSession.create({ data: { id: sessionId, userId: user.id, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } });
        return { accessToken, refreshToken: newRefresh };
    }
    async logout(userId, sessionId, allDevices = false) {
        if (allDevices) {
            await this.prisma.refreshToken.updateMany({ where: { userId, isRevoked: false }, data: { isRevoked: true } });
            await this.prisma.userSession.updateMany({ where: { userId, isRevoked: false }, data: { isRevoked: true } });
        }
        else if (sessionId) {
            await this.prisma.userSession.updateMany({ where: { id: sessionId }, data: { isRevoked: true } });
        }
        return { success: true };
    }
    async verifyEmail(token) {
        const user = await this.prisma.user.findFirst({ where: { emailVerificationToken: token } });
        if (!user)
            throw new common_1.BadRequestException('Invalid token');
        await this.prisma.user.update({ where: { id: user.id }, data: { emailVerified: true, emailVerificationToken: null } });
        return { verified: true };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService, config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map