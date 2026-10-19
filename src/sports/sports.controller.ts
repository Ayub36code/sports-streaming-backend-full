import { Controller, Get, Query, Param, Post, Patch, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SportsService } from './sports.service';
import { Public } from '../common/decorators/public.decorator';
import { CreateSportDto } from './dto/create-sport.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
@ApiTags('Sports')
@Controller({ path: 'sports', version: '1' })
export class SportsController {
  constructor(private service: SportsService) {}
  @Public() @Get() list(@Query('q') q?: string, @Query('all') all?: string) {
    if (all === 'true') return this.service.listAll(q);
    return this.service.listActive();
  }
  @Public() @Get(':id') get(@Param('id') id: string) { return this.service.getById(id); }
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN','SUPER_ADMIN','CONTENT_MANAGER')
  @Post() create(@Body() dto: CreateSportDto) { return this.service.create(dto); }
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN','SUPER_ADMIN','CONTENT_MANAGER')
  @Patch(':id') update(@Param('id') id: string, @Body() dto: CreateSportDto) { return this.service.update(id, dto); }
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN','SUPER_ADMIN')
  @Delete(':id') remove(@Param('id') id: string) { return this.service.delete(id); }
}
