import { PrismaService } from '../prisma/prisma.service';
export declare class AdminController {
    private prisma;
    constructor(prisma: PrismaService);
    stats(): Promise<{
        users: number;
        events: number;
        streams: number;
        completedOrders: number;
    }>;
}
