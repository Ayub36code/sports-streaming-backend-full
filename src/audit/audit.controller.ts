import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
@ApiTags('Audit')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN','SUPER_ADMIN')
@Controller({ path: 'admin/audit-logs', version: '1' })
export class AuditController {
  constructor(private s: AuditService) {}
  @Get() list(@Query('page') page=1, @Query('limit') limit=50) { return this.s.list(Number(page), Number(limit)); }
}
