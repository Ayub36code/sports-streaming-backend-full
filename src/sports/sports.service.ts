import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSportDto } from './dto/create-sport.dto';
@Injectable()
export class SportsService {
  constructor(private prisma: PrismaService) {}
  listActive() { return this.prisma.sport.findMany({ where: { isActive: true }, orderBy: { name: 'asc' } }); }
  listAll(q?: string) { return this.prisma.sport.findMany({ where: q ? { name: { contains: q, mode: 'insensitive' } } : {}, orderBy: { name: 'asc' } }); }
  getById(id: string) { return this.prisma.sport.findUnique({ where: { id } }); }
  getBySlug(slug: string) { return this.prisma.sport.findUnique({ where: { slug } }); }
  async create(dto: CreateSportDto) { return this.prisma.sport.create({ data: dto }); }
  async update(id: string, dto: Partial<CreateSportDto>) {
    const ex = await this.prisma.sport.findUnique({ where: { id } });
    if (!ex) throw new NotFoundException('Sport not found');
    return this.prisma.sport.update({ where: { id }, data: dto });
  }
  async delete(id: string) { return this.prisma.sport.update({ where: { id }, data: { isActive: false } }); }
}
