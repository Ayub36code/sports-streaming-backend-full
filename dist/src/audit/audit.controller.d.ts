import { AuditService } from './audit.service';
export declare class AuditController {
    private s;
    constructor(s: AuditService);
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
