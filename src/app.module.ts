import { Module } from '@nestjs/common';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nest_course',
      autoLoadEntities: true,
      subscribers: [],
      migrations: [],
      logging: false,
      synchronize: true,
      cache: {
        duration: 3000, // 3 seconds
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
