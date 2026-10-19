"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const nestjs_pino_1 = require("nestjs-pino");
const helmet_1 = require("helmet");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    app.useLogger(app.get(nestjs_pino_1.Logger));
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT', 3000);
    const prefix = configService.get('API_PREFIX', 'api/v1');
    const frontendUrl = configService.get('FRONTEND_URL');
    app.use((0, helmet_1.default)());
    app.use(cookieParser());
    app.enableCors({
        origin: frontendUrl ? [frontendUrl, 'http://localhost:3000', 'http://localhost:3001'] : true,
        credentials: true,
    });
    app.setGlobalPrefix(prefix, { exclude: ['health'] });
    app.enableVersioning({ type: common_1.VersioningType.URI, defaultVersion: '1' });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    const docBuilder = new swagger_1.DocumentBuilder()
        .setTitle('Global Multi-Sport Streaming API')
        .setDescription('Secure, scalable backend for global sports streaming - supports all sports')
        .setVersion('1.0.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
        .addTag('Auth')
        .addTag('Health')
        .addTag('Sports')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, docBuilder);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: { persistAuthorization: true },
    });
    await app.listen(port);
    console.log(`API listening on http://localhost:${port}/${prefix}`);
    console.log(`Swagger at http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map