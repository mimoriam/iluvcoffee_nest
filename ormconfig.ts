import { DataSource } from 'typeorm';

const connectionSource = new DataSource({
  migrationsTableName: 'migrations_table',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nest_course',
  entities: ['dist/**/*.entity.ts'],
  subscribers: [],
  migrations: ['src/migrations/*.ts'],
  logging: false,
  synchronize: false,
});

export default connectionSource;
