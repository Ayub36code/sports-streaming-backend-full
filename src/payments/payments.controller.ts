import { Controller, Post, Body, UseGuards, Get, Param, Headers } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';
@ApiTags('Payments')
@Controller({ version: '1' })
export class PaymentsController {
  constructor(private s: PaymentsService) {}
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard) @Post('checkout') checkout(@CurrentUser() u: any, @Body() dto: any) { return this.s.checkout(u.id, dto); }
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard) @Get('payments/history') history(@CurrentUser() u: any) { return this.s.history(u.id); }
  @Public() @Post('webhooks/payments/:provider') webhook(@Param('provider') provider: string, @Body() payload: any, @Headers('x-signature') sig: string) { return this.s.handleWebhook(provider, payload, sig || ''); }
}
