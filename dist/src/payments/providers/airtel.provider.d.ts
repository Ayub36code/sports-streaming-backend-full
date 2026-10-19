import { PaymentProviderAdapter } from '../payment-providers.interface';
export declare class AirtelMoneyProvider implements PaymentProviderAdapter {
    provider: string;
    private logger;
    createPayment(amountCents: number, currency: string, metadata: any): Promise<{
        providerPaymentId: string;
        status: string;
    }>;
    verifyWebhook(payload: any, sig: string): Promise<boolean>;
}
