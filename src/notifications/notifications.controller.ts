import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
@ApiTags('Notifications')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller({ path: 'notifications', version: '1' })
export class NotificationsController {
  constructor(private s: NotificationsService) {}
  @Get() list(@CurrentUser() u: any) { return this.s.list(u.id); }
  @Patch(':id/read') read(@CurrentUser() u: any, @Param('id') id: string) { return this.s.markRead(u.id, id); }
}
