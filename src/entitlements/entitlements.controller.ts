import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EntitlementsService } from './entitlements.service';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
@ApiTags('Playback')
@Controller({ path: 'playback', version: '1' })
export class EntitlementsController {
  constructor(private s: EntitlementsService) {}
  @Public() @Post('authorize') authorize(@Body() dto: any, @CurrentUser() user: any) { return this.s.authorize(user, dto); }
  @Public() @Post('heartbeat') heartbeat(@Body() dto: { jti: string }) { return this.s.heartbeat(dto.jti); }
  @Public() @Post('stop') stop(@Body() dto: { jti: string }) { return this.s.stop(dto.jti); }
}
