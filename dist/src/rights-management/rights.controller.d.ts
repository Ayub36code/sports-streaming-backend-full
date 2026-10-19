import { RightsService } from './rights.service';
export declare class RightsController {
    private s;
    constructor(s: RightsService);
    list(): import(".prisma/client").Prisma.PrismaPromise<({
        contentRights: ({
            territory: {
                id: string;
                createdAt: Date;
                name: string;
                code: string;
                region: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            sportId: string | null;
            competitionId: string | null;
            seasonId: string | null;
            eventId: string | null;
            agreementId: string;
            territoryId: string;
            videoAssetId: string | null;
            contentType: import(".prisma/client").$Enums.RightsContentType;
            isAllowed: boolean;
            blackoutStart: Date | null;
            blackoutEnd: Date | null;
            maxDevices: number | null;
            maxConcurrency: number | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date;
        endDate: Date;
        status: string;
        title: string;
        holderName: string;
        distributor: string | null;
        isExclusive: boolean;
        notes: string | null;
    })[]>;
    create(dto: any): import(".prisma/client").Prisma.Prisma__RightsAgreementClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date;
        endDate: Date;
        status: string;
        title: string;
        holderName: string;
        distributor: string | null;
        isExclusive: boolean;
        notes: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
