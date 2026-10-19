import { Controller, Get, Post, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { StreamingService } from './streaming.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';
@ApiTags('Streaming')
@Controller({ version: '1' })
export class StreamingController {
  constructor(private s: StreamingService) {}
  @Public() @Get('events/:id/streams') eventStreams(@Param('id') id: string) { return this.s.getEventStreams(id); }
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN','SUPER_ADMIN','CONTENT_MANAGER')
  @Get('admin/streams') list() { return this.s.listStreams(); }
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN','SUPER_ADMIN','CONTENT_MANAGER')
  @Post('admin/streams') create(@Body() dto: any) { return this.s.createStream(dto); }
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN','SUPER_ADMIN','CONTENT_MANAGER')
  @Patch('admin/streams/:id') update(@Param('id') id: string, @Body() dto: any) { return this.s.updateStream(id, dto); }
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN','SUPER_ADMIN','CONTENT_MANAGER')
  @Post('admin/events/:id/streams') map(@Param('id') eventId: string, @Body() body: { streamId: string; isPrimary?: boolean }) { return this.s.mapEventToStream(eventId, body.streamId, body.isPrimary); }
}
