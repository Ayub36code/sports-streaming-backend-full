import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RightsService } from './rights.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
@ApiTags('Rights')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN','SUPER_ADMIN','RIGHTS_MANAGER')
@Controller({ path: 'admin/rights', version: '1' })
export class RightsController {
  constructor(private s: RightsService) {}
  @Get() list() { return this.s.list(); }
  @Post() create(@Body() dto: any) { return this.s.create(dto); }
}
