import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}
  log(actorId: string | null, action: string, entity: string, entityId?: string, metadata?: any, ip?: string) {
    return this.prisma.auditLog.create({ data: { actorId, action, entity, entityId, metadata, ipAddress: ip } });
  }
  list(page = 1, limit = 50) {
    const skip = (page-1)*limit;
    return this.prisma.auditLog.findMany({ orderBy: { createdAt: 'desc' }, skip, take: limit, include: { actor: { select: { email: true, role: true } } } });
  }
}
