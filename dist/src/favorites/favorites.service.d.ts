import { PrismaService } from '../prisma/prisma.service';
export declare class FavoritesService {
    private prisma;
    constructor(prisma: PrismaService);
    list(userId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        userId: string;
        entityType: string;
        entityId: string;
    }[]>;
    toggle(userId: string, entityType: string, entityId: string): Promise<{
        favorited: boolean;
    }>;
}
