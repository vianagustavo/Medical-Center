import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from './entities/doctor.entity';
import { CreateDoctorController } from './controllers/createDoctor.controller';
import { HttpModule } from '@nestjs/axios';
import { GetDoctorService } from './services/getDoctor.service';
import { GetDoctorController } from './controllers/getDoctor.controller';
import { CreateDoctorService } from './services/createDoctor.service';
import { UpdateDoctorService } from './services/update-doctor.service';
import { DeleteDoctorService } from './services/delete-doctor.service';
import { UpdateDoctorController } from './controllers/update-doctor.controller';
import { DeleteDoctorController } from './controllers/delete-doctor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity]), HttpModule],
  providers: [
    CreateDoctorService,
    UpdateDoctorService,
    DeleteDoctorService,
    GetDoctorService,
  ],
  controllers: [
    CreateDoctorController,
    UpdateDoctorController,
    DeleteDoctorController,
    GetDoctorController,
  ],
})
export class DoctorModule {}
