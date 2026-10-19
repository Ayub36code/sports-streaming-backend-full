import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class CompetitionsService {
  constructor(private prisma: PrismaService) {}
  list(filters: any) {
    const where: any = {};
    if (filters.sportId) where.sportId = filters.sportId;
    if (filters.countryCode) where.countryCode = filters.countryCode;
    if (filters.q) where.name = { contains: filters.q, mode: 'insensitive' };
    return this.prisma.competition.findMany({ where, include: { sport: true }, orderBy: { name: 'asc' }, take: filters.limit || 50, skip: filters.skip || 0 });
  }
  get(id: string) { return this.prisma.competition.findUnique({ where: { id }, include: { sport: true, seasons: true } }); }
  create(data: any) { return this.prisma.competition.create({ data }); }
  update(id: string, data: any) { return this.prisma.competition.update({ where: { id }, data }); }
}
