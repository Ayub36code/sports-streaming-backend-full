"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockProvider = void 0;
class MockProvider {
    constructor() {
        this.provider = 'MOCK';
    }
    async createPayment(amountCents, currency, metadata) { return { providerPaymentId: `mock_${Date.now()}`, status: 'PENDING' }; }
    async verifyWebhook(payload, signature) { return true; }
}
exports.MockProvider = MockProvider;
//# sourceMappingURL=mock.provider.js.map