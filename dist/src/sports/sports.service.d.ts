import { PrismaService } from '../prisma/prisma.service';
import { CreateSportDto } from './dto/create-sport.dto';
export declare class SportsService {
    private prisma;
    constructor(prisma: PrismaService);
    listActive(): import(".prisma/client").Prisma.PrismaPromise<{
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
    listAll(q?: string): import(".prisma/client").Prisma.PrismaPromise<{
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
    getById(id: string): import(".prisma/client").Prisma.Prisma__SportClient<{
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
    getBySlug(slug: string): import(".prisma/client").Prisma.Prisma__SportClient<{
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
    update(id: string, dto: Partial<CreateSportDto>): Promise<{
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
    delete(id: string): Promise<{
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
