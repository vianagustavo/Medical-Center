import { IsNotEmpty, MaxLength } from 'class-validator';
import { DoctorSpecialization } from '../doctor.entity';

export interface ISaveDoctorDataDto {
  name: string;
  crm: string;
  medicalSpecialization: DoctorSpecialization[];
  landlineNumber: number;
  mobileNumber: number;
  zipcode: number;
  address: string;
  complement: string;
  district: string;
  city: string;
  state: string;
}

export class UpdateDoctorDataDto {
  @MaxLength(120, {
    message: 'Name is too long',
  })
  name?: string;

  @MaxLength(7, {
    message: 'CRM is too long',
  })
  crm?: string;

  medicalSpecialization?: DoctorSpecialization[];

  landlineNumber?: number;

  mobileNumber?: number;

  zipcode?: number;
}

export class SaveDoctorBodyDto {
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
  zipcode: number;
}
