import { PrismaService } from '../prisma/prisma.service';
export declare class VenuesService {
    private prisma;
    constructor(prisma: PrismaService);
    list(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        countryCode: string | null;
        timezone: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        city: string | null;
        capacity: number | null;
        latitude: number | null;
        longitude: number | null;
    }[]>;
    get(id: string): import(".prisma/client").Prisma.Prisma__VenueClient<{
        id: string;
        countryCode: string | null;
        timezone: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        city: string | null;
        capacity: number | null;
        latitude: number | null;
        longitude: number | null;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(data: any): import(".prisma/client").Prisma.Prisma__VenueClient<{
        id: string;
        countryCode: string | null;
        timezone: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        city: string | null;
        capacity: number | null;
        latitude: number | null;
        longitude: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
