import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorEntity } from './doctor.entity';
import { GetDoctorFilters } from './dto/doctor.dto';

@Injectable()
export class GetDoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
  ) {}

  async getDoctors(filters: GetDoctorFilters): Promise<DoctorEntity[]> {
    return await this.doctorRepository.find({ where: filters });
  }
}
