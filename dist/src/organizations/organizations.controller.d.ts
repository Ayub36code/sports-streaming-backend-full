import { OrganizationsService } from './organizations.service';
export declare class OrganizationsController {
    private s;
    constructor(s: OrganizationsService);
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
    create(dto: any): import(".prisma/client").Prisma.Prisma__OrganizationClient<{
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
    update(id: string, dto: any): import(".prisma/client").Prisma.Prisma__OrganizationClient<{
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
