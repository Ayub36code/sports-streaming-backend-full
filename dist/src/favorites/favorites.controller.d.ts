import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private s;
    constructor(s: FavoritesService);
    list(u: any): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        userId: string;
        entityType: string;
        entityId: string;
    }[]>;
    toggle(u: any, dto: {
        entityType: string;
        entityId: string;
    }): Promise<{
        favorited: boolean;
    }>;
}
