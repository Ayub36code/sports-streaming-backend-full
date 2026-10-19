import { PrismaService } from '../prisma/prisma.service';
export declare class OrganizationsService {
    private prisma;
    constructor(prisma: PrismaService);
    list(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        countryCode: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        type: string | null;
        logoUrl: string | null;
        website: string | null;
    }[]>;
    get(id: string): import(".prisma/client").Prisma.Prisma__OrganizationClient<{
        id: string;
        countryCode: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        type: string | null;
        logoUrl: string | null;
        website: string | null;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(data: any): import(".prisma/client").Prisma.Prisma__OrganizationClient<{
        id: string;
        countryCode: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        type: string | null;
        logoUrl: string | null;
        website: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, data: any): import(".prisma/client").Prisma.Prisma__OrganizationClient<{
        id: string;
        countryCode: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        type: string | null;
        logoUrl: string | null;
        website: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
