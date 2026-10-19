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
var EntitlementsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitlementsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const rights_service_1 = require("../rights-management/rights.service");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const uuid_1 = require("uuid");
let EntitlementsService = EntitlementsService_1 = class EntitlementsService {
    constructor(prisma, rights, config, jwt) {
        this.prisma = prisma;
        this.rights = rights;
        this.config = config;
        this.jwt = jwt;
        this.logger = new common_1.Logger(EntitlementsService_1.name);
    }
    async authorize(user, dto) {
        if (!dto.countryCode)
            throw new common_1.BadRequestException('countryCode required');
        let event = null;
        let video = null;
        if (dto.eventId) {
            event = await this.prisma.event.findUnique({ where: { id: dto.eventId } });
            if (!event)
                throw new common_1.NotFoundException('Event not found');
            if (!event.isPublished)
                throw new common_1.ForbiddenException('Event not published');
        }
        if (dto.videoAssetId) {
            video = await this.prisma.videoAsset.findUnique({ where: { id: dto.videoAssetId } });
            if (!video)
                throw new common_1.NotFoundException('Video not found');
            if (!video.isPublished)
                throw new common_1.ForbiddenException('Video not published');
        }
        const contentType = video ? video.type : (event?.status === 'LIVE' ? 'LIVE' : 'REPLAY');
        const hasRights = await this.rights.checkRights({ territoryCode: dto.countryCode, eventId: dto.eventId, videoAssetId: dto.videoAssetId, contentType });
        if (!hasRights)
            throw new common_1.ForbiddenException({ code: 'TERRITORY_NOT_ALLOWED', message: `Content not licensed in ${dto.countryCode}` });
        if (user) {
            const now = new Date();
            const entitlements = await this.prisma.entitlement.findMany({ where: { userId: user.id, isActive: true, OR: [{ endDate: null }, { endDate: { gte: now } }], startDate: { lte: now } } });
            const subs = await this.prisma.subscription.findMany({ where: { userId: user.id, status: 'ACTIVE', OR: [{ endDate: null }, { endDate: { gte: now } }] }, include: { plan: true } });
            const hasEntitlement = entitlements.some(e => !e.eventId || e.eventId === dto.eventId) || subs.length > 0;
            const isFree = event?.metadata?.isFree || video?.metadata?.isFree;
            if (!hasEntitlement && !isFree)
                throw new common_1.ForbiddenException({ code: 'SUBSCRIPTION_REQUIRED', message: 'Active subscription or purchase required' });
            const activeSessions = await this.prisma.playbackSession.count({ where: { userId: user.id, isActive: true } });
            if (activeSessions >= 3)
                throw new common_1.ForbiddenException({ code: 'CONCURRENCY_LIMIT', message: 'Too many concurrent streams' });
        }
        else {
            const isFree = event?.metadata?.isFree || video?.metadata?.isFree;
            if (!isFree)
                throw new common_1.ForbiddenException({ code: 'AUTH_REQUIRED', message: 'Authentication required' });
        }
        const jti = (0, uuid_1.v4)();
        const playbackSecret = this.config.get('PLAYBACK_TOKEN_SECRET') || 'dev-secret';
        const token = this.jwt.sign({ jti, eventId: dto.eventId, videoAssetId: dto.videoAssetId, country: dto.countryCode, userId: user?.id }, { secret: playbackSecret, expiresIn: '5m' });
        await this.prisma.playbackSession.create({ data: { tokenJti: jti, userId: user?.id, eventId: dto.eventId, videoAssetId: dto.videoAssetId, countryCode: dto.countryCode, deviceId: dto.deviceId } });
        const cdnBase = this.config.get('CDN_BASE_URL') || 'https://cdn.example.com';
        const hlsUrl = `${cdnBase}/hls/${dto.eventId || dto.videoAssetId}/master.m3u8?token=${token}`;
        return { playbackToken: token, hlsUrl, dashUrl: hlsUrl.replace('hls', 'dash').replace('m3u8', 'mpd'), expiresIn: 300, jti };
    }
    async heartbeat(jti) { await this.prisma.playbackSession.update({ where: { tokenJti: jti }, data: { lastHeartbeatAt: new Date() } }); return { ok: true }; }
    async stop(jti) { await this.prisma.playbackSession.update({ where: { tokenJti: jti }, data: { isActive: false, endedAt: new Date() } }); return { stopped: true }; }
};
exports.EntitlementsService = EntitlementsService;
exports.EntitlementsService = EntitlementsService = EntitlementsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, rights_service_1.RightsService, config_1.ConfigService, jwt_1.JwtService])
], EntitlementsService);
//# sourceMappingURL=entitlements.service.js.map