import { PrismaService } from '../prisma/prisma.service';
import { Queue } from 'bullmq';
export declare class NotificationsService {
    private prisma;
    private queue;
    private logger;
    constructor(prisma: PrismaService, queue: Queue);
    sendToUser(userId: string, type: string, title: string, body?: string, data?: any): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        userId: string;
        title: string;
        body: string | null;
        isRead: boolean;
    }>;
    scheduleEventReminder(eventId: string): Promise<void>;
    list(userId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        type: string;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        userId: string;
        title: string;
        body: string | null;
        isRead: boolean;
    }[]>;
    markRead(userId: string, id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
