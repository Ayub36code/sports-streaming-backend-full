import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class AthletesService {
  constructor(private prisma: PrismaService) {}
  list(q?: string) { return this.prisma.athlete.findMany({ where: q ? { displayName: { contains: q, mode: 'insensitive' } } : {}, take: 50, orderBy: { lastName: 'asc' } }); }
  get(id: string) { return this.prisma.athlete.findUnique({ where: { id } }); }
  create(data: any) { return this.prisma.athlete.create({ data }); }
  update(id: string, data: any) { return this.prisma.athlete.update({ where: { id }, data }); }
}
