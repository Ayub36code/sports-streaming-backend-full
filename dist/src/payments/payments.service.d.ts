import { PrismaService } from '../prisma/prisma.service';
export declare class PaymentsService {
    private prisma;
    private logger;
    private providers;
    constructor(prisma: PrismaService);
    checkout(userId: string, dto: {
        planId?: string;
        eventId?: string;
        provider: string;
        amountCents: number;
        currency?: string;
        metadata?: any;
    }): Promise<{
        order: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            type: string;
            currency: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            userId: string;
            eventId: string | null;
            provider: import(".prisma/client").$Enums.PaymentProvider;
            planId: string | null;
            amountCents: number;
            providerOrderId: string | null;
            promoCode: string | null;
        };
        payment: any;
    }>;
    handleWebhook(provider: string, payload: any, signature: string): Promise<{
        ignored: boolean;
        processed?: undefined;
    } | {
        processed: boolean;
        ignored?: undefined;
    }>;
    history(userId: string): import(".prisma/client").Prisma.PrismaPromise<({
        payments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            currency: string;
            status: string;
            provider: import(".prisma/client").$Enums.PaymentProvider;
            amountCents: number;
            providerPaymentId: string | null;
            rawCallback: import("@prisma/client/runtime/library").JsonValue | null;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        type: string;
        currency: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        userId: string;
        eventId: string | null;
        provider: import(".prisma/client").$Enums.PaymentProvider;
        planId: string | null;
        amountCents: number;
        providerOrderId: string | null;
        promoCode: string | null;
    })[]>;
}
