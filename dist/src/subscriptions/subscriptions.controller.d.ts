import { SubscriptionsService } from './subscriptions.service';
export declare class SubscriptionsController {
    private s;
    constructor(s: SubscriptionsService);
    plans(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        sportId: string | null;
        competitionId: string | null;
        description: string | null;
        interval: string;
        priceCents: number;
        currency: string;
        features: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    my(u: any): import(".prisma/client").Prisma.PrismaPromise<({
        plan: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            sportId: string | null;
            competitionId: string | null;
            description: string | null;
            interval: string;
            priceCents: number;
            currency: string;
            features: import("@prisma/client/runtime/library").JsonValue | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        startDate: Date;
        endDate: Date | null;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        userId: string;
        planId: string;
        renewsAt: Date | null;
        cancelledAt: Date | null;
    })[]>;
    subscribe(u: any, dto: {
        planId: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        startDate: Date;
        endDate: Date | null;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        userId: string;
        planId: string;
        renewsAt: Date | null;
        cancelledAt: Date | null;
    }>;
}
