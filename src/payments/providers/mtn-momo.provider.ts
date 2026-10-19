import { PaymentProviderAdapter } from '../payment-providers.interface';
import { Logger } from '@nestjs/common';
export class MtnMomoProvider implements PaymentProviderAdapter {
  provider = 'MTN_MOMO'; private logger = new Logger(MtnMomoProvider.name);
  async createPayment(amountCents: number, currency: string, metadata: any) {
    this.logger.log(`MTN MoMo create payment ${amountCents} ${currency} phone ${metadata.phone}`);
    return { providerPaymentId: `mtn_${Date.now()}`, status: 'PENDING' };
  }
  async verifyWebhook(payload: any, signature: string) { return true; }
}
