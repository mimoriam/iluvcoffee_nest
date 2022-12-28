// npm install @nestjs/mapped-types
// npm install class-validator class-transformer

// npm install @nestjs/typeorm typeorm pg

// npm install @nestjs/config

// npm install joi

// npm install @nestjs/swagger swagger-ui-express

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap().then();
