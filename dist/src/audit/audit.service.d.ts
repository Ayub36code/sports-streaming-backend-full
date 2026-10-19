import { PrismaService } from '../prisma/prisma.service';
export declare class AuditService {
    private prisma;
    constructor(prisma: PrismaService);
    log(actorId: string | null, action: string, entity: string, entityId?: string, metadata?: any, ip?: string): import(".prisma/client").Prisma.Prisma__AuditLogClient<{
        id: string;
        createdAt: Date;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        ipAddress: string | null;
        entityId: string | null;
        action: string;
        entity: string;
        actorId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    list(page?: number, limit?: number): import(".prisma/client").Prisma.PrismaPromise<({
        actor: {
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
    } & {
        id: string;
        createdAt: Date;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        ipAddress: string | null;
        entityId: string | null;
        action: string;
        entity: string;
        actorId: string | null;
    })[]>;
}
