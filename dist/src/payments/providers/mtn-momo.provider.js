"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MtnMomoProvider = void 0;
const common_1 = require("@nestjs/common");
class MtnMomoProvider {
    constructor() {
        this.provider = 'MTN_MOMO';
        this.logger = new common_1.Logger(MtnMomoProvider.name);
    }
    async createPayment(amountCents, currency, metadata) {
        this.logger.log(`MTN MoMo create payment ${amountCents} ${currency} phone ${metadata.phone}`);
        return { providerPaymentId: `mtn_${Date.now()}`, status: 'PENDING' };
    }
    async verifyWebhook(payload, signature) { return true; }
}
exports.MtnMomoProvider = MtnMomoProvider;
//# sourceMappingURL=mtn-momo.provider.js.map