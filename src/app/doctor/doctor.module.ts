import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from './doctor.entity';
import { CreateDoctorService } from './createDoctor.service';
import { CreateDoctorController } from './createDoctor.controller';
import { HttpModule } from '@nestjs/axios';
import { UpdateDoctorService } from './update-doctor.service';
import { UpdateDoctorController } from './update-doctor.controller';
import { DeleteDoctorService } from './delete-doctor.service';
import { DeleteDoctorController } from './delete-doctor.controller';
import { GetDoctorService } from './getDoctor.service';
import { GetDoctorController } from './getDoctor.controller';

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
