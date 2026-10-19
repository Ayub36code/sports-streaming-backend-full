import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}
  list(q?: string) {
    const where = q ? {
      name: { contains: q, mode: 'insensitive' } } : {};
    return this.prisma.team.findMany({ orderBy: { name: 'asc' }, take: 50 }); }
  get(id: string) { return this.prisma.team.findUnique({ where: { id }, include: { rosters: { include: { athlete: true } } } }); }
  create(data: any) { return this.prisma.team.create({ data }); }
  update(id: string, data: any) { return this.prisma.team.update({ where: { id }, data }); }
}
