import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private s;
    constructor(s: NotificationsService);
    list(u: any): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        type: string;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        userId: string;
        title: string;
        body: string | null;
        isRead: boolean;
    }[]>;
    read(u: any, id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
