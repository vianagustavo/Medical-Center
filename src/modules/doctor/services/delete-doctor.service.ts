import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from '../entities/doctor.entity';
import { DoctorsRepository } from '../repositories/doctor.repository';

@Injectable()
export class DeleteDoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: DoctorsRepository,
  ) {}

  async delete(id: string): Promise<void> {
    const doctor = await this.doctorRepository.findOne({ where: { id } });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    await this.doctorRepository.softDelete(id);
  }
}
