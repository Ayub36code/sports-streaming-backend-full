import { PrismaService } from '../prisma/prisma.service';
export declare class StreamingService {
    private prisma;
    constructor(prisma: PrismaService);
    listStreams(): import(".prisma/client").Prisma.PrismaPromise<{
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
    createStream(data: any): import(".prisma/client").Prisma.Prisma__StreamClient<{
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
    updateStream(id: string, data: any): import(".prisma/client").Prisma.Prisma__StreamClient<{
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
    getEventStreams(eventId: string): import(".prisma/client").Prisma.PrismaPromise<({
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
    mapEventToStream(eventId: string, streamId: string, isPrimary?: boolean): import(".prisma/client").Prisma.Prisma__EventStreamClient<{
        id: string;
        createdAt: Date;
        eventId: string;
        streamId: string;
        isPrimary: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
