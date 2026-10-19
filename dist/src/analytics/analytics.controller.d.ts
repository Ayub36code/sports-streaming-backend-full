import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private s;
    constructor(s: AnalyticsService);
    track(dto: any, user: any): Promise<{
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
