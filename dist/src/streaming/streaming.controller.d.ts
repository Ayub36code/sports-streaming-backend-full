import { StreamingService } from './streaming.service';
export declare class StreamingController {
    private s;
    constructor(s: StreamingService);
    eventStreams(id: string): import(".prisma/client").Prisma.PrismaPromise<({
        stream: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            status: import(".prisma/client").$Enums.StreamStatus;
            provider: string;
            ingestUrl: string | null;
            playbackBaseUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        eventId: string;
        streamId: string;
        isPrimary: boolean;
    })[]>;
    list(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        status: import(".prisma/client").$Enums.StreamStatus;
        provider: string;
        ingestUrl: string | null;
        playbackBaseUrl: string | null;
    }[]>;
    create(dto: any): import(".prisma/client").Prisma.Prisma__StreamClient<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        status: import(".prisma/client").$Enums.StreamStatus;
        provider: string;
        ingestUrl: string | null;
        playbackBaseUrl: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, dto: any): import(".prisma/client").Prisma.Prisma__StreamClient<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        status: import(".prisma/client").$Enums.StreamStatus;
        provider: string;
        ingestUrl: string | null;
        playbackBaseUrl: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    map(eventId: string, body: {
        streamId: string;
        isPrimary?: boolean;
    }): import(".prisma/client").Prisma.Prisma__EventStreamClient<{
        id: string;
        createdAt: Date;
        eventId: string;
        streamId: string;
        isPrimary: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
