import { Repository } from 'typeorm';
import { DoctorSpecializationEntity } from '../entities/specialization.entity';

export class SpecializationsRepository extends Repository<DoctorSpecializationEntity> {}
