// npm install @nestjs/mapped-types
// npm install class-validator class-transformer

// npm install @nestjs/typeorm typeorm pg

// Migrations:
// npm run build
// npx typeorm migration:create src/migrations/CoffeeRefactor
// npx typeorm-ts-node-esm migration:run -d ormconfig.ts

// npm install @nestjs/config

// npm install joi

// npm install @nestjs/swagger swagger-ui-express

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  // This filter on EVERY error includes a "timestamp" field:
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}

bootstrap().then();
