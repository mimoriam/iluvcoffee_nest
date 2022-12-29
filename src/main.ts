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

// Authentication starts here:
// nest g resource users

// npm i bcrypt
// npm i -D @types/bcrypt

// nest g module iam
// nest g service iam/hashing
// nest g service iam/hashing/bcrypt --flat
// nest g controller iam/authentication
// nest g service iam/authentication
// nest g class iam/authentication/dto/sign-in.dto
// nest g class iam/authentication/dto/sign-up.dto

// npm i cookie-parser
// npm i -D @types/cookie-parser
// npm i @nestjs/jwt

// nest g guard iam/authentication/guards/access-token
// nest g guard iam/authentication/guards/authentication

// This is for refresh token rotation:
// npm i --save ioredis
// nest g class iam/authentication/refresh-token-ids.storage

// nest g guard iam/authorization/guards/roles

// API Keys:
// nest g class users/api-keys/entities/api-key.entity --no-spec
// nest g service iam/authentication/api-keys --flat
// nest g guard iam/authentication/guards/api-key

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

import * as cookieParser from 'cookie-parser';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  app.use(cookieParser());

  const options = new DocumentBuilder()
    .setTitle('ILoveCoffee')
    .setDescription('Coffee application')
    .setVersion('1.0')
    .addTag('coffees')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap().then();
