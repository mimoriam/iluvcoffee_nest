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
