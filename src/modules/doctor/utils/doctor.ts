import {
  DoctorSpecialization,
  DoctorSpecializationEntity,
} from '../entities/specialization.entity';

export function buildDoctorSpecialization(
  specializations: DoctorSpecialization[],
) {
  const doctorSpecializationEntities: DoctorSpecializationEntity[] = [];
  specializations.forEach((spec) => {
    const doctorSpecializationEntity = new DoctorSpecializationEntity();
    doctorSpecializationEntity.specialization = spec;
    doctorSpecializationEntities.push(doctorSpecializationEntity);
  });
  return doctorSpecializationEntities;
}
