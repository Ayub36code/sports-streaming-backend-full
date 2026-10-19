import { PaymentProviderAdapter } from '../payment-providers.interface';
export class MockProvider implements PaymentProviderAdapter {
  provider = 'MOCK';
  async createPayment(amountCents: number, currency: string, metadata: any) { return { providerPaymentId: `mock_${Date.now()}`, status: 'PENDING' }; }
  async verifyWebhook(payload: any, signature: string) { return true; }
}
