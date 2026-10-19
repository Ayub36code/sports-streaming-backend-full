import { Injectable, ForbiddenException, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RightsService } from '../rights-management/rights.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class EntitlementsService {
  private logger = new Logger(EntitlementsService.name);
  constructor(private prisma: PrismaService, private rights: RightsService, private config: ConfigService, private jwt: JwtService) {}
  async authorize(user: any, dto: { eventId?: string; videoAssetId?: string; countryCode: string; deviceId?: string }) {
    if (!dto.countryCode) throw new BadRequestException('countryCode required');
    let event = null; let video = null;
    if (dto.eventId) {
      event = await this.prisma.event.findUnique({ where: { id: dto.eventId } });
      if (!event) throw new NotFoundException('Event not found');
      if (!event.isPublished) throw new ForbiddenException('Event not published');
    }
    if (dto.videoAssetId) {
      video = await this.prisma.videoAsset.findUnique({ where: { id: dto.videoAssetId } });
      if (!video) throw new NotFoundException('Video not found');
      if (!video.isPublished) throw new ForbiddenException('Video not published');
    }
    const contentType = video ? video.type : (event?.status === 'LIVE' ? 'LIVE' : 'REPLAY');
    const hasRights = await this.rights.checkRights({ territoryCode: dto.countryCode, eventId: dto.eventId, videoAssetId: dto.videoAssetId, contentType });
    if (!hasRights) throw new ForbiddenException({ code: 'TERRITORY_NOT_ALLOWED', message: `Content not licensed in ${dto.countryCode}` });
    if (user) {
      const now = new Date();
      const entitlements = await this.prisma.entitlement.findMany({ where: { userId: user.id, isActive: true, OR: [{ endDate: null }, { endDate: { gte: now } }], startDate: { lte: now } } });
      const subs = await this.prisma.subscription.findMany({ where: { userId: user.id, status: 'ACTIVE', OR: [{ endDate: null }, { endDate: { gte: now } }] }, include: { plan: true } });
      const hasEntitlement = entitlements.some(e => !e.eventId || e.eventId === dto.eventId) || subs.length > 0;
      const isFree = (event as any)?.metadata?.isFree || (video as any)?.metadata?.isFree;
      if (!hasEntitlement && !isFree) throw new ForbiddenException({ code: 'SUBSCRIPTION_REQUIRED', message: 'Active subscription or purchase required' });
      const activeSessions = await this.prisma.playbackSession.count({ where: { userId: user.id, isActive: true } });
      if (activeSessions >= 3) throw new ForbiddenException({ code: 'CONCURRENCY_LIMIT', message: 'Too many concurrent streams' });
    } else {
      const isFree = (event as any)?.metadata?.isFree || (video as any)?.metadata?.isFree;
      if (!isFree) throw new ForbiddenException({ code: 'AUTH_REQUIRED', message: 'Authentication required' });
    }
    const jti = uuidv4();
    const playbackSecret = this.config.get('PLAYBACK_TOKEN_SECRET') || 'dev-secret';
    const token = this.jwt.sign({ jti, eventId: dto.eventId, videoAssetId: dto.videoAssetId, country: dto.countryCode, userId: user?.id }, { secret: playbackSecret, expiresIn: '5m' });
    await this.prisma.playbackSession.create({ data: { tokenJti: jti, userId: user?.id, eventId: dto.eventId, videoAssetId: dto.videoAssetId, countryCode: dto.countryCode, deviceId: dto.deviceId } });
    const cdnBase = this.config.get('CDN_BASE_URL') || 'https://cdn.example.com';
    const hlsUrl = `${cdnBase}/hls/${dto.eventId || dto.videoAssetId}/master.m3u8?token=${token}`;
    return { playbackToken: token, hlsUrl, dashUrl: hlsUrl.replace('hls','dash').replace('m3u8','mpd'), expiresIn: 300, jti };
  }
  async heartbeat(jti: string) { await this.prisma.playbackSession.update({ where: { tokenJti: jti }, data: { lastHeartbeatAt: new Date() } }); return { ok: true }; }
  async stop(jti: string) { await this.prisma.playbackSession.update({ where: { tokenJti: jti }, data: { isActive: false, endedAt: new Date() } }); return { stopped: true }; }
}
