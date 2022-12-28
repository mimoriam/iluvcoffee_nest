import { Module } from '@nestjs/common';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { IamModule } from './iam/iam.module';
import * as Joi from 'joi';

@Module({
  imports: [
    // Config will always be at the top:
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.required(),
        DB_PORT: Joi.number().default(5432),
      }),
    }),
    CoffeesModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        subscribers: [],
        migrations: [],
        logging: false,
        synchronize: true,
        cache: {
          duration: 3000, // 3 seconds
        },
      }),
    }),
    UsersModule,
    IamModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
