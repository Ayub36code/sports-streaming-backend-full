import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}
  list(userId: string) { return this.prisma.favorite.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }); }
  async toggle(userId: string, entityType: string, entityId: string) {
    const existing = await this.prisma.favorite.findUnique({ where: { userId_entityType_entityId: { userId, entityType, entityId } } });
    if (existing) { await this.prisma.favorite.delete({ where: { id: existing.id } }); return { favorited: false }; }
    await this.prisma.favorite.create({ data: { userId, entityType, entityId } });
    return { favorited: true };
  }
}
