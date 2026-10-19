import { PaymentProviderAdapter } from '../payment-providers.interface';
import { Logger } from '@nestjs/common';
export class AirtelMoneyProvider implements PaymentProviderAdapter {
  provider = 'AIRTEL_MONEY'; private logger = new Logger(AirtelMoneyProvider.name);
  async createPayment(amountCents: number, currency: string, metadata: any) {
    this.logger.log(`Airtel Money payment ${amountCents} ${currency}`);
    return { providerPaymentId: `airtel_${Date.now()}`, status: 'PENDING' };
  }
  async verifyWebhook(payload: any, sig: string) { return true; }
}
