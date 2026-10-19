import { TeamsService } from './teams.service';
export declare class TeamsController {
    private s;
    constructor(s: TeamsService);
    list(q: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        countryCode: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        logoUrl: string | null;
        sportId: string | null;
        shortName: string | null;
        isNational: boolean;
    }[]>;
    get(id: string): import(".prisma/client").Prisma.Prisma__TeamClient<{
        rosters: ({
            athlete: {
                id: string;
                firstName: string;
                lastName: string;
                displayName: string | null;
                countryCode: string | null;
                createdAt: Date;
                updatedAt: Date;
                slug: string;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                sportId: string | null;
                dateOfBirth: Date | null;
                gender: string | null;
                photoUrl: string | null;
            };
        } & {
            id: string;
            isActive: boolean;
            createdAt: Date;
            seasonId: string | null;
            teamId: string;
            athleteId: string;
            position: string | null;
            jerseyNumber: string | null;
        })[];
    } & {
        id: string;
        countryCode: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        logoUrl: string | null;
        sportId: string | null;
        shortName: string | null;
        isNational: boolean;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(dto: any): import(".prisma/client").Prisma.Prisma__TeamClient<{
        id: string;
        countryCode: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        logoUrl: string | null;
        sportId: string | null;
        shortName: string | null;
        isNational: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: any): import(".prisma/client").Prisma.Prisma__TeamClient<{
        id: string;
        countryCode: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        logoUrl: string | null;
        sportId: string | null;
        shortName: string | null;
        isNational: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
