import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const databaseConfig = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*.{js,ts}'],
  migrationsRun: true,
  synchronize: false,
};

const dataSource: DataSourceOptions = {
  type: 'mysql',
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  entities: databaseConfig.entities,
  migrations: databaseConfig.migrations,
  migrationsRun: databaseConfig.migrationsRun,
  synchronize: databaseConfig.synchronize,
};

export const AppDataSource = new DataSource(dataSource);
