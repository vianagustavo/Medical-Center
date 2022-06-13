import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from './app/doctor/doctor.entity';
import { DoctorModule } from './app/doctor/doctor.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'medical-center',
      entities: [DoctorEntity],
      synchronize: true,
    }),
    DoctorModule,
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
