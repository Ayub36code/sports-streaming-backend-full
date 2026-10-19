import { Controller, Get, Query, Param, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
@ApiTags('Teams')
@Controller({ path: 'teams', version: '1' })
export class TeamsController {
  constructor(private s: TeamsService) {}
  @Public() @Get() list(@Query('q') q: string) { return this.s.list(q); }
  @Public() @Get(':id') get(@Param('id') id: string) { return this.s.get(id); }
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN','SUPER_ADMIN','CONTENT_MANAGER')
  @Post() create(@Body() dto: any) { return this.s.create(dto); }
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN','SUPER_ADMIN','CONTENT_MANAGER')
  @Patch(':id') update(@Param('id') id: string, @Body() dto: any) { return this.s.update(id, dto); }
}
