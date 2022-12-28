// npm install @nestjs/mapped-types
// npm install class-validator class-transformer

// npm install @nestjs/typeorm typeorm pg

// npm install @nestjs/config

// npm install joi

// npm install @nestjs/swagger swagger-ui-express

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

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
  await app.listen(3000);
}

bootstrap().then();
