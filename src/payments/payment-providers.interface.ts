export interface PaymentProviderAdapter {
  provider: string;
  createPayment(amountCents: number, currency: string, metadata: any): Promise<{ providerPaymentId: string; redirectUrl?: string; status: string }>;
  verifyWebhook(payload: any, signature: string): Promise<boolean>;
}
