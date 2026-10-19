import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class StreamingService {
  constructor(private prisma: PrismaService) {}
  listStreams() { return this.prisma.stream.findMany({ orderBy: { name: 'asc' } }); }
  createStream(data: any) { return this.prisma.stream.create({ data }); }
  updateStream(id: string, data: any) { return this.prisma.stream.update({ where: { id }, data }); }
  getEventStreams(eventId: string) { return this.prisma.eventStream.findMany({ where: { eventId }, include: { stream: true } }); }
  mapEventToStream(eventId: string, streamId: string, isPrimary = false) { return this.prisma.eventStream.create({ data: { eventId, streamId, isPrimary } }); }
}
