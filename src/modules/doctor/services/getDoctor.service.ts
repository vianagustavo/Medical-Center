import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from '../entities/doctor.entity';
import { GetDoctorFilters } from '../dto/doctor.dto';
import { DoctorsRepository } from '../repositories/doctor.repository';

@Injectable()
export class GetDoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: DoctorsRepository,
  ) {}

  async getDoctors(filters: GetDoctorFilters): Promise<DoctorEntity[]> {
    return await this.doctorRepository.find({
      where: filters,
      relations: { specializations: true },
    });
  }
}
