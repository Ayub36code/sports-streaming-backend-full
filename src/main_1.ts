import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const prefix = configService.get<string>('API_PREFIX', 'api/v1');
  const frontendUrl = configService.get<string>('FRONTEND_URL');

  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    origin: frontendUrl ? [frontendUrl, 'http://localhost:3000', 'http://localhost:3001'] : true,
    credentials: true,
  });

  app.setGlobalPrefix(prefix, { exclude: ['health'] });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const docBuilder = new DocumentBuilder()
    .setTitle('Global Multi-Sport Streaming API')
    .setDescription('Secure, scalable backend for global sports streaming - supports all sports')
    .setVersion('1.0.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .addTag('Auth')
    .addTag('Health')
    .addTag('Sports')
    .build();

  const document = SwaggerModule.createDocument(app, docBuilder);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(port);
  console.log(`API listening on http://localhost:${port}/${prefix}`);
  console.log(`Swagger at http://localhost:${port}/api/docs`);
}
bootstrap();