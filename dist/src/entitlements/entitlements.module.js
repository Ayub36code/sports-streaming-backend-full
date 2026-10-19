"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitlementsModule = void 0;
const common_1 = require("@nestjs/common");
const entitlements_service_1 = require("./entitlements.service");
const entitlements_controller_1 = require("./entitlements.controller");
const rights_module_1 = require("../rights-management/rights.module");
const jwt_1 = require("@nestjs/jwt");
let EntitlementsModule = class EntitlementsModule {
};
exports.EntitlementsModule = EntitlementsModule;
exports.EntitlementsModule = EntitlementsModule = __decorate([
    (0, common_1.Module)({ imports: [rights_module_1.RightsModule, jwt_1.JwtModule.register({})], providers: [entitlements_service_1.EntitlementsService], controllers: [entitlements_controller_1.EntitlementsController], exports: [entitlements_service_1.EntitlementsService] })
], EntitlementsModule);
//# sourceMappingURL=entitlements.module.js.map