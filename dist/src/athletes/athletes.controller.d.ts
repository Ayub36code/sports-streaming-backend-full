import { AthletesService } from './athletes.service';
export declare class AthletesController {
    private s;
    constructor(s: AthletesService);
    list(q: string): import(".prisma/client").Prisma.PrismaPromise<{
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
    }[]>;
    get(id: string): import(".prisma/client").Prisma.Prisma__AthleteClient<{
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(dto: any): import(".prisma/client").Prisma.Prisma__AthleteClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: any): import(".prisma/client").Prisma.Prisma__AthleteClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
