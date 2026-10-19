import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class VideoAssetsService {
  constructor(private prisma: PrismaService) {}
  list(filters: any) {
    const where: any = {};
    if (filters.type) where.type = filters.type;
    if (filters.eventId) where.eventId = filters.eventId;
    if (filters.isPublished !== undefined) where.isPublished = filters.isPublished === 'true';
    return this.prisma.videoAsset.findMany({ where, orderBy: { createdAt: 'desc' }, take: 50 });
  }
  get(id: string) { return this.prisma.videoAsset.findUnique({ where: { id } }); }
  create(data: any) { return this.prisma.videoAsset.create({ data }); }
  update(id: string, data: any) { return this.prisma.videoAsset.update({ where: { id }, data }); }
}
