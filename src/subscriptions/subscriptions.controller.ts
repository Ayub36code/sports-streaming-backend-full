import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';
@ApiTags('Subscriptions')
@Controller({ version: '1' })
export class SubscriptionsController {
  constructor(private s: SubscriptionsService) {}
  @Public() @Get('plans') plans() { return this.s.plans(); }
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard) @Get('subscriptions') my(@CurrentUser() u: any) { return this.s.userSubs(u.id); }
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard) @Post('subscriptions') subscribe(@CurrentUser() u: any, @Body() dto: { planId: string }) { return this.s.subscribe(u.id, dto.planId); }
}
