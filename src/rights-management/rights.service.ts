import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class RightsService {
  constructor(private prisma: PrismaService) {}
  list() { return this.prisma.rightsAgreement.findMany({ include: { contentRights: { include: { territory: true } } }, orderBy: { createdAt: 'desc' } }); }
  create(data: any) { return this.prisma.rightsAgreement.create({ data }); }
  async checkRights(params: { territoryCode: string; eventId?: string; videoAssetId?: string; contentType: string }) {
    const territory = await this.prisma.territory.findUnique({ where: { code: params.territoryCode } });
    if (!territory) return false;
    const now = new Date();
    const rights = await this.prisma.contentRight.findMany({
      where: { territoryId: territory.id, isAllowed: true, contentType: { in: [params.contentType as any, 'ALL'] as any }, agreement: { status: 'ACTIVE', startDate: { lte: now }, endDate: { gte: now } } },
      include: { agreement: true },
    });
    // filter by specific event/video if provided, else generic rights apply
    const filtered = rights.filter(r => {
      if (params.eventId && r.eventId && r.eventId !== params.eventId) return false;
      if (params.videoAssetId && r.videoAssetId && r.videoAssetId !== params.videoAssetId) return false;
      return true;
    });
    if (filtered.length === 0) return false;
    for (const r of filtered) {
      if (r.blackoutStart && r.blackoutEnd && now >= r.blackoutStart && now <= r.blackoutEnd) continue;
      return true;
    }
    return false;
  }
}
