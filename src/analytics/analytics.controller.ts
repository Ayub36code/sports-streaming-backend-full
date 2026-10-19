import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
@ApiTags('Analytics')
@Controller({ version: '1' })
export class AnalyticsController {
  constructor(private s: AnalyticsService) {}
  @Public() @Post('analytics/track') track(@Body() dto: any, @CurrentUser() user: any) { return this.s.track(user?.id || dto.userId || null, dto.eventId || null, dto.type, dto.value, dto.metadata); }
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN','SUPER_ADMIN') @Get('admin/analytics') overview() { return this.s.overview(); }
}
