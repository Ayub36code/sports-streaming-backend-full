import { PrismaService } from '../prisma/prisma.service';
export declare class SportsController {
    private prisma;
    constructor(prisma: PrismaService);
    list(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        category: string | null;
        isTeamBased: boolean;
        scoringType: string | null;
        iconUrl: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
}
