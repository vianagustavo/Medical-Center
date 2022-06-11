import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from './doctor.entity';
import { CreateDoctorService } from './createDoctor.service';
import { CreateDoctorController } from './createDoctor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity])],
  providers: [CreateDoctorService],
  controllers: [CreateDoctorController],
})
export class DoctorModule {}
