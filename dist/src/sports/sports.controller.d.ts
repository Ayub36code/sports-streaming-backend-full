import { SportsService } from './sports.service';
import { CreateSportDto } from './dto/create-sport.dto';
export declare class SportsController {
    private service;
    constructor(service: SportsService);
    list(q?: string, all?: string): import(".prisma/client").Prisma.PrismaPromise<{
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
    }[]>;
    get(id: string): import(".prisma/client").Prisma.Prisma__SportClient<{
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(dto: CreateSportDto): Promise<{
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
    }>;
    update(id: string, dto: CreateSportDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
