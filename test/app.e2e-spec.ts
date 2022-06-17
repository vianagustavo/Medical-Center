import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/modules/app/app.module';
import {
  SaveDoctorBodyDto,
  UpdateDoctorDataDto,
} from '../src/modules/doctor/dto/doctor.dto';
import { DoctorSpecialization } from '../src/modules/doctor/entities/specialization.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource, databaseConfig } from '../src/database/database.config';
import { DoctorEntity } from '../src/modules/doctor/entities/doctor.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.query(`CREATE DATABASE e2etest`);

    const moduleFixture: TestingModule = await Test.createTestingModule({
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
          database: process.env.MYSQL_TEST_DATABASE,
          entities: databaseConfig.entities,
          migrations: databaseConfig.migrations,
          migrationsRun: databaseConfig.migrationsRun,
          synchronize: databaseConfig.synchronize,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await AppDataSource.query(`DROP DATABASE e2etest`);
    await AppDataSource.destroy();
  });

  describe('Doctor flow', () => {
    it('should create', async () => {
      const doctor: SaveDoctorBodyDto = {
        name: 'testxdxd',
        crm: '1234567',
        specializations: [DoctorSpecialization.ALERGOLOGIA],
        landlineNumber: 212121,
        mobileNumber: 212121,
        zipcode: 22793810,
      };
      return request(app.getHttpServer())
        .post('/doctors')
        .send(doctor)
        .expect(HttpStatus.CREATED);
    });

    it('should reject duplicate crm inputs', async () => {
      const doctor: SaveDoctorBodyDto = {
        name: 'testxdxd',
        crm: '1234567',
        specializations: [DoctorSpecialization.ALERGOLOGIA],
        landlineNumber: 212121,
        mobileNumber: 212121,
        zipcode: 22793810,
      };
      return request(app.getHttpServer())
        .post('/doctors')
        .send(doctor)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should list all doctors', async () => {
      return request(app.getHttpServer()).get('/doctors').expect(HttpStatus.OK);
    });
  });
});
