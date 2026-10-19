import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}
  async list(filters: any) {
    const where: any = { isPublished: filters.isPublished !== undefined ? filters.isPublished : true };
    if (filters.sportId) where.sportId = filters.sportId;
    if (filters.competitionId) where.competitionId = filters.competitionId;
    if (filters.status) where.status = filters.status;
    if (filters.from) where.scheduledAt = { gte: new Date(filters.from) };
    if (filters.to) where.scheduledAt = { ...where.scheduledAt, lte: new Date(filters.to) };
    if (filters.teamId) where.participants = { some: { teamId: filters.teamId } };
    if (filters.athleteId) where.participants = { some: { athleteId: filters.athleteId } };
    const page = Number(filters.page) || 1;
    const limit = Number(filters.limit) || 20;
    const skip = (page-1)*limit;
    const [items, total] = await Promise.all([
      this.prisma.event.findMany({ where, include: { sport: true, competition: true, venue: true, participants: { include: { team: true, athlete: true } } }, orderBy: { scheduledAt: filters.sortOrder === 'asc' ? 'asc' : 'desc' }, skip, take: limit }),
      this.prisma.event.count({ where }),
    ]);
    return { items, total, page, limit };
  }
  live() { return this.prisma.event.findMany({ where: { status: 'LIVE', isPublished: true }, include: { sport: true, competition: true } }); }
  upcoming() { return this.prisma.event.findMany({ where: { status: 'SCHEDULED', isPublished: true, scheduledAt: { gte: new Date() } }, orderBy: { scheduledAt: 'asc' }, take: 20 }); }
  async get(id: string) {
    const ev = await this.prisma.event.findUnique({ where: { id }, include: { sport: true, competition: true, season: true, venue: true, participants: { include: { team: true, athlete: true } }, results: true, streams: { include: { stream: true } } } });
    if (!ev) throw new NotFoundException('Event not found');
    return ev;
  }
  async create(dto: CreateEventDto) { return this.prisma.event.create({ data: { ...dto, scheduledAt: new Date(dto.scheduledAt) } }); }
  async update(id: string, dto: any) { if (dto.scheduledAt) dto.scheduledAt = new Date(dto.scheduledAt); return this.prisma.event.update({ where: { id }, data: dto }); }
  async results(id: string) { return this.prisma.eventResult.findMany({ where: { eventId: id } }); }
  async addParticipant(eventId: string, data: any) { return this.prisma.eventParticipant.create({ data: { ...data, eventId } }); }
  async addResult(eventId: string, data: any) { return this.prisma.eventResult.create({ data: { ...data, eventId } }); }
}
