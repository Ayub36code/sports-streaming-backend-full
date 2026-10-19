import { Controller, Get, Query, Param, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { Public } from '../common/decorators/public.decorator';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
@ApiTags('Events')
@Controller({ path: 'events', version: '1' })
export class EventsController {
  constructor(private s: EventsService) {}
  @Public() @Get() list(@Query() q: any) { return this.s.list(q); }
  @Public() @Get('live') live() { return this.s.live(); }
  @Public() @Get('upcoming') upcoming() { return this.s.upcoming(); }
  @Public() @Get(':id') get(@Param('id') id: string) { return this.s.get(id); }
  @Public() @Get(':id/results') results(@Param('id') id: string) { return this.s.results(id); }
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN','SUPER_ADMIN','CONTENT_MANAGER')
  @Post() create(@Body() dto: CreateEventDto) { return this.s.create(dto); }
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN','SUPER_ADMIN','CONTENT_MANAGER')
  @Patch(':id') update(@Param('id') id: string, @Body() dto: any) { return this.s.update(id, dto); }
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN','SUPER_ADMIN','CONTENT_MANAGER')
  @Post(':id/participants') addParticipant(@Param('id') id: string, @Body() dto: any) { return this.s.addParticipant(id, dto); }
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN','SUPER_ADMIN','CONTENT_MANAGER')
  @Post(':id/results') addResult(@Param('id') id: string, @Body() dto: any) { return this.s.addResult(id, dto); }
}
