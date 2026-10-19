import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
@ApiTags('Favorites')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller({ path: 'favorites', version: '1' })
export class FavoritesController {
  constructor(private s: FavoritesService) {}
  @Get() list(@CurrentUser() u: any) { return this.s.list(u.id); }
  @Post('toggle') toggle(@CurrentUser() u: any, @Body() dto: { entityType: string; entityId: string }) { return this.s.toggle(u.id, dto.entityType, dto.entityId); }
}
