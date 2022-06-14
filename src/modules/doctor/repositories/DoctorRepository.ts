import { Repository } from 'typeorm';
import { DoctorEntity } from '../entities/doctor.entity';

export class DoctorsRepository extends Repository<DoctorEntity> {}
