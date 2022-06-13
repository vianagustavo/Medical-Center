import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DoctorSpecialization {
  ALERGOLOGIA = 'ALERGOLOGIA',
  ANGIOLOGIA = 'ANGIOLOGIA',
  BUCO_MAXILO = 'BUCO_MAXILO',
  CARDIOLOGIA_CLÍNICA = 'CARDIOLOGIA_CLÍNICA',
  CARDIOLOGIA_INFANTIL = 'CARDIOLOGIA_INFANTIL',
  CIRURGIA_CABEÇA_PESCOÇO = 'CIRURGIA_CABEÇA_PESCOÇO',
  CIRURGIA_CARDÍACA = 'CIRURGIA_CABEÇA_PESCOÇO',
  CIRURGIA_TÓRAX = 'CIRURGIA_CABEÇA_PESCOÇO',
}

export interface IDoctorSpecialization {
  specialization: DoctorSpecialization[];
}

@Entity({ name: 'doctors' })
export class DoctorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false, unique: true })
  crm: string;

  @Column({ name: 'landline_number', nullable: false })
  landlineNumber: number;

  @Column({ name: 'mobile_number', nullable: false })
  mobileNumber: number;

  @Column({ nullable: false })
  zipcode: number;

  @Column({
    name: 'medical_specialization',
    nullable: false,
    type: 'json',
  })
  medicalSpecialization: DoctorSpecialization[];

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  district: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  complement: string;

  @Column({ nullable: false })
  state: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
