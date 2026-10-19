import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { PrismaService } from '../prisma/prisma.service';
@ApiTags('Admin')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN','SUPER_ADMIN','CONTENT_MANAGER','RIGHTS_MANAGER','SUPPORT_AGENT')
@Controller({ path: 'admin', version: '1' })
export class AdminController {
  constructor(private prisma: PrismaService) {}
  @Get('stats') async stats() {
    const [users, events, streams, orders] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.event.count(),
      this.prisma.stream.count(),
      this.prisma.order.count({ where: { status: 'COMPLETED' } }),
    ]);
    return { users, events, streams, completedOrders: orders };
  }
}
