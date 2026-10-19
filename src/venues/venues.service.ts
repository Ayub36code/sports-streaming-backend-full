import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class VenuesService {
  constructor(private prisma: PrismaService) {}
  list() { return this.prisma.venue.findMany({ take: 50 }); }
  get(id: string) { return this.prisma.venue.findUnique({ where: { id } }); }
  create(data: any) { return this.prisma.venue.create({ data }); }
}
