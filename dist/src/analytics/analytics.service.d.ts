import { PrismaService } from '../prisma/prisma.service';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    track(userId: string | null, eventId: string | null, type: string, value?: number, metadata?: any): Promise<{
        id: string;
        createdAt: Date;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        type: string;
        userId: string | null;
        eventId: string | null;
        value: number | null;
    }>;
    overview(): Promise<{
        totalEvents: number;
        totalUsers: number;
        activePlayback: number;
        revenueCents: number;
    }>;
}
