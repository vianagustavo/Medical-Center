import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { DoctorSpecialization } from '../entities/specialization.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SaveDoctorDataDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  crm: string;

  @ApiProperty()
  specializations: DoctorSpecialization[];

  @ApiProperty()
  landlineNumber: number;

  @ApiProperty()
  mobileNumber: number;

  @ApiProperty()
  zipcode: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  complement: string;

  @ApiProperty()
  district: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;
}

export class UpdateDoctorDataDto {
  @IsOptional()
  @MaxLength(120, {
    message: 'Name is too long',
  })
  @ApiPropertyOptional()
  name?: string;

  @IsOptional()
  @MaxLength(7, {
    message: 'CRM is too long',
  })
  @ApiPropertyOptional()
  crm?: string;

  @IsOptional()
  @IsEnum(DoctorSpecialization, { each: true })
  @ApiPropertyOptional()
  specializations?: DoctorSpecialization[];

  @ApiPropertyOptional()
  landlineNumber?: number;

  @ApiPropertyOptional()
  mobileNumber?: number;

  @ApiPropertyOptional()
  zipcode?: number;
}

export class SaveDoctorBodyDto {
  @IsNotEmpty()
  @MaxLength(120, {
    message: 'Name is too long',
  })
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @MaxLength(7, {
    message: 'CRM is too long',
  })
  @ApiProperty()
  crm: string;

  @IsEnum(DoctorSpecialization, { each: true })
  @IsNotEmpty()
  @ApiProperty()
  specializations: DoctorSpecialization[];

  @IsNotEmpty()
  @ApiProperty()
  landlineNumber: number;

  @IsNotEmpty()
  @ApiProperty()
  mobileNumber: number;

  @IsNotEmpty()
  @ApiProperty()
  zipcode: number;
}

export class GetDoctorFilters {
  @IsOptional()
  name?: string;

  @IsOptional()
  crm?: string;

  @IsOptional()
  landlineNumber?: number;

  @IsOptional()
  mobileNumber?: number;

  @IsOptional()
  zipcode?: number;

  @IsOptional()
  address?: string;

  @IsOptional()
  complement?: string;

  @IsOptional()
  district?: string;

  @IsOptional()
  city?: string;

  @IsOptional()
  state?: string;
}
