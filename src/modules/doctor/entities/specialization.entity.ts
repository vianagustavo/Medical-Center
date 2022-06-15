import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DoctorEntity } from './doctor.entity';

export enum DoctorSpecialization {
  ALERGOLOGIA = 'ALERGOLOGIA',
  ANGIOLOGIA = 'ANGIOLOGIA',
  BUCO_MAXILO = 'BUCO_MAXILO',
  CARDIOLOGIA_CLÍNICA = 'CARDIOLOGIA_CLÍNICA',
  CARDIOLOGIA_INFANTIL = 'CARDIOLOGIA_INFANTIL',
  CIRURGIA_CABEÇA_PESCOÇO = 'CIRURGIA_CABEÇA_PESCOÇO',
  CIRURGIA_CARDÍACA = 'CIRURGIA_CARDÍACA',
  CIRURGIA_TÓRAX = 'CIRURGIA_TÓRAX',
}

@Entity({ name: 'doctor_specialization' })
export class DoctorSpecializationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn({ name: 'doctorId' })
  @ManyToOne(() => DoctorEntity, (doctor) => doctor.specializations)
  doctor: DoctorEntity;

  @Column({
    name: 'specialization',
    nullable: false,
    type: 'enum',
    enum: DoctorSpecialization,
  })
  specialization: DoctorSpecialization;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
