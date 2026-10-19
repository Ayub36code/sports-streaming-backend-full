import { CompetitionsService } from './competitions.service';
export declare class CompetitionsController {
    private s;
    constructor(s: CompetitionsService);
    list(q: any): import(".prisma/client").Prisma.PrismaPromise<({
        sport: {
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
        };
    } & {
        id: string;
        countryCode: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        logoUrl: string | null;
        sportId: string;
        organizationId: string | null;
        level: string;
    })[]>;
    get(id: string): import(".prisma/client").Prisma.Prisma__CompetitionClient<{
        sport: {
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
        };
        seasons: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            competitionId: string;
            startDate: Date;
            endDate: Date;
        }[];
    } & {
        id: string;
        countryCode: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        logoUrl: string | null;
        sportId: string;
        organizationId: string | null;
        level: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(dto: any): import(".prisma/client").Prisma.Prisma__CompetitionClient<{
        id: string;
        countryCode: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        logoUrl: string | null;
        sportId: string;
        organizationId: string | null;
        level: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: any): import(".prisma/client").Prisma.Prisma__CompetitionClient<{
        id: string;
        countryCode: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        logoUrl: string | null;
        sportId: string;
        organizationId: string | null;
        level: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
