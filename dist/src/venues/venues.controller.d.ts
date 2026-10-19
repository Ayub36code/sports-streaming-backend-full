import { VenuesService } from './venues.service';
export declare class VenuesController {
    private s;
    constructor(s: VenuesService);
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
    create(dto: any): import(".prisma/client").Prisma.Prisma__VenueClient<{
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
