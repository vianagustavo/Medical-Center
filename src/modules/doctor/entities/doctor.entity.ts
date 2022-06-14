import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DoctorSpecializationEntity } from './specialization.entity';

@Entity({ name: 'doctors' })
export class DoctorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  crm: string;

  @Column({ name: 'landline_number', nullable: false })
  landlineNumber: number;

  @Column({ name: 'mobile_number', nullable: false })
  mobileNumber: number;

  @Column({ nullable: false })
  zipcode: number;

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

  @OneToMany(
    () => DoctorSpecializationEntity,
    (specialization) => specialization.doctor,
  )
  specializations: DoctorSpecializationEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
