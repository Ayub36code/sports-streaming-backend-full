"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirtelMoneyProvider = void 0;
const common_1 = require("@nestjs/common");
class AirtelMoneyProvider {
    constructor() {
        this.provider = 'AIRTEL_MONEY';
        this.logger = new common_1.Logger(AirtelMoneyProvider.name);
    }
    async createPayment(amountCents, currency, metadata) {
        this.logger.log(`Airtel Money payment ${amountCents} ${currency}`);
        return { providerPaymentId: `airtel_${Date.now()}`, status: 'PENDING' };
    }
    async verifyWebhook(payload, sig) { return true; }
}
exports.AirtelMoneyProvider = AirtelMoneyProvider;
//# sourceMappingURL=airtel.provider.js.map