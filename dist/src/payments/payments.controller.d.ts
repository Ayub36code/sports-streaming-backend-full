import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private s;
    constructor(s: PaymentsService);
    checkout(u: any, dto: any): Promise<{
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
    history(u: any): import(".prisma/client").Prisma.PrismaPromise<({
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
    webhook(provider: string, payload: any, sig: string): Promise<{
        ignored: boolean;
        processed?: undefined;
    } | {
        processed: boolean;
        ignored?: undefined;
    }>;
}
