import { IsNotEmpty, MaxLength } from 'class-validator';
import { DoctorSpecialization } from '../doctor.entity';

export class SaveDoctorDto {
  @IsNotEmpty()
  @MaxLength(120, {
    message: 'Name is too long',
  })
  name: string;

  @IsNotEmpty()
  @MaxLength(7, {
    message: 'CRM is too long',
  })
  crm: string;

  @IsNotEmpty()
  medicalSpecialization: DoctorSpecialization[];

  @IsNotEmpty()
  landlineNumber: number;

  @IsNotEmpty()
  mobileNumber: number;

  @IsNotEmpty()
  cep: number;
}
