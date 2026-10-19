import { PrismaService } from '../prisma/prisma.service';
export declare class AthletesService {
    private prisma;
    constructor(prisma: PrismaService);
    list(q?: string): import(".prisma/client").Prisma.PrismaPromise<{
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
    create(data: any): import(".prisma/client").Prisma.Prisma__AthleteClient<{
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
    update(id: string, data: any): import(".prisma/client").Prisma.Prisma__AthleteClient<{
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
