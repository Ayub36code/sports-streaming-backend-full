import { PrismaService } from '../prisma/prisma.service';
export declare class SubscriptionsService {
    private prisma;
    constructor(prisma: PrismaService);
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
    subscribe(userId: string, planId: string): Promise<{
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
    userSubs(userId: string): import(".prisma/client").Prisma.PrismaPromise<({
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
}
