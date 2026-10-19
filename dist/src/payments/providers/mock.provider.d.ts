import { PaymentProviderAdapter } from '../payment-providers.interface';
export declare class MockProvider implements PaymentProviderAdapter {
    provider: string;
    createPayment(amountCents: number, currency: string, metadata: any): Promise<{
        providerPaymentId: string;
        status: string;
    }>;
    verifyWebhook(payload: any, signature: string): Promise<boolean>;
}
