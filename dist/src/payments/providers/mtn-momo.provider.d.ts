import { PaymentProviderAdapter } from '../payment-providers.interface';
export declare class MtnMomoProvider implements PaymentProviderAdapter {
    provider: string;
    private logger;
    createPayment(amountCents: number, currency: string, metadata: any): Promise<{
        providerPaymentId: string;
        status: string;
    }>;
    verifyWebhook(payload: any, signature: string): Promise<boolean>;
}
