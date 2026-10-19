import { Controller, Get, Query, Param, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CompetitionsService } from './competitions.service';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
@ApiTags('Competitions')
@Controller({ path: 'competitions', version: '1' })
export class CompetitionsController {
  constructor(private s: CompetitionsService) {}
  @Public() @Get() list(@Query() q: any) { return this.s.list({ ...q, limit: Number(q.limit)||20, skip: q.page ? (Number(q.page)-1)*(Number(q.limit)||20) : 0 }); }
  @Public() @Get(':id') get(@Param('id') id: string) { return this.s.get(id); }
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN','SUPER_ADMIN','CONTENT_MANAGER')
  @Post() create(@Body() dto: any) { return this.s.create(dto); }
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN','SUPER_ADMIN','CONTENT_MANAGER')
  @Patch(':id') update(@Param('id') id: string, @Body() dto: any) { return this.s.update(id, dto); }
}
