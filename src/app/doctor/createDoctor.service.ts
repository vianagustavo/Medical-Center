import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, In, Repository } from 'typeorm';
import { DoctorEntity, DoctorSpecialization } from './doctor.entity';
import { SaveDoctorDto } from './dto/save-doctor.dto';

@Injectable()
export class CreateDoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
  ) {}

  async save(data: SaveDoctorDto): Promise<DoctorEntity> {
    return this.doctorRepository.save(this.doctorRepository.create(data));
  }
}
