"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitlementsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const entitlements_service_1 = require("./entitlements.service");
const public_decorator_1 = require("../common/decorators/public.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let EntitlementsController = class EntitlementsController {
    constructor(s) {
        this.s = s;
    }
    authorize(dto, user) { return this.s.authorize(user, dto); }
    heartbeat(dto) { return this.s.heartbeat(dto.jti); }
    stop(dto) { return this.s.stop(dto.jti); }
};
exports.EntitlementsController = EntitlementsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('authorize'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EntitlementsController.prototype, "authorize", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('heartbeat'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EntitlementsController.prototype, "heartbeat", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('stop'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EntitlementsController.prototype, "stop", null);
exports.EntitlementsController = EntitlementsController = __decorate([
    (0, swagger_1.ApiTags)('Playback'),
    (0, common_1.Controller)({ path: 'playback', version: '1' }),
    __metadata("design:paramtypes", [entitlements_service_1.EntitlementsService])
], EntitlementsController);
//# sourceMappingURL=entitlements.controller.js.map