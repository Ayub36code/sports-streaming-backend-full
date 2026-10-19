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
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ioredis_1 = require("ioredis");
let RedisService = RedisService_1 = class RedisService {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger(RedisService_1.name);
        const url = this.config.get('REDIS_URL');
        if (url) {
            this.client = new ioredis_1.default(url, { maxRetriesPerRequest: 3 });
        }
        else {
            const host = this.config.get('REDIS_HOST', 'localhost');
            const port = this.config.get('REDIS_PORT', 6379);
            this.client = new ioredis_1.default({ host, port, maxRetriesPerRequest: 3 });
        }
        this.client.on('connect', () => this.logger.log('Redis connected'));
        this.client.on('error', (e) => this.logger.error('Redis error', e));
    }
    async onModuleDestroy() {
        await this.client.quit();
    }
    async get(key) { return this.client.get(key); }
    async set(key, value, ttlSec) {
        if (ttlSec)
            return this.client.set(key, value, 'EX', ttlSec);
        return this.client.set(key, value);
    }
    async del(key) { return this.client.del(key); }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RedisService);
//# sourceMappingURL=redis.service_1.js.map