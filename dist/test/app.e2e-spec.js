"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const app_module_1 = require("../src/app.module");
describe('App (e2e)', () => {
    let app;
    beforeAll(async () => {
        const mod = await testing_1.Test.createTestingModule({ imports: [app_module_1.AppModule] }).compile();
        app = mod.createNestApplication();
        await app.init();
    });
    it('/health/ready (GET)', () => request(app.getHttpServer()).get('/health/ready').expect(200));
    afterAll(async () => await app.close());
});
//# sourceMappingURL=app.e2e-spec.js.map