import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}
  async search(q: string) {
    if (!q || q.length < 2) return { sports: [], competitions: [], teams: [], athletes: [], events: [] };
    const contains = { contains: q, mode: 'insensitive' as const };
    const [sports, competitions, teams, athletes, events] = await Promise.all([
      this.prisma.sport.findMany({ where: { name: contains }, take: 5 }),
      this.prisma.competition.findMany({ where: { name: contains }, take: 5 }),
      this.prisma.team.findMany({ where: { name: contains }, take: 5 }),
      this.prisma.athlete.findMany({ where: { OR: [{ firstName: contains }, { lastName: contains }, { displayName: contains }] }, take: 5 }),
      this.prisma.event.findMany({ where: { title: contains, isPublished: true }, take: 10, orderBy: { scheduledAt: 'desc' } }),
    ]);
    return { sports, competitions, teams, athletes, events };
  }
  async liveNow() { return this.prisma.event.findMany({ where: { status: 'LIVE', isPublished: true }, include: { sport: true }, take: 20 }); }
  async featured() { return this.prisma.event.findMany({ where: { isPublished: true, scheduledAt: { gte: new Date(Date.now()-7*24*60*60*1000) } }, orderBy: { scheduledAt: 'desc' }, take: 10 }); }
}
