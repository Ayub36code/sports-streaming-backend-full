import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('Sports')
@Controller({ path: 'sports', version: '1' })
export class SportsController {
  constructor(private prisma: PrismaService) {}
  @Get()
  async list() {
    const sports = await this.prisma.sport.findMany({ where: { isActive: true }, orderBy: { name: 'asc' } });
    return sports;
  }
}