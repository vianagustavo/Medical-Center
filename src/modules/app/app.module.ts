import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from '../doctor/doctor.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CepModule } from '../cep/cep.module';
import { databaseConfig } from '../../database/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
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
    }),
    DoctorModule,
    HttpModule,
    CepModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
