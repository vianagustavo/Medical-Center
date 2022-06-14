import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from '../entities/doctor.entity';
import { SaveDoctorBodyDto } from '../dto/doctor.dto';
import { DoctorsRepository } from '../repositories/doctor.repository';
import {
  CepIntegrationService,
  IAddressInfo,
} from 'src/modules/cep/services/cep.service';
import { DoctorSpecializationEntity } from '../entities/specialization.entity';
import { DataSource } from 'typeorm';
import { buildDoctorSpecialization } from '../utils/doctor';

@Injectable()
export class CreateDoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: DoctorsRepository,
    private readonly cepService: CepIntegrationService,
    private dataSource: DataSource,
  ) {}

  async save(data: SaveDoctorBodyDto): Promise<DoctorEntity> {
    const doctor = await this.doctorRepository.findOne({
      where: { crm: data.crm },
    });

    if (doctor) {
      throw new BadRequestException('Doctor is already registered');
    }
    const addressInfo = await this.cepService.getAddressInfo(data.zipcode);

    const doctorSpecializations = buildDoctorSpecialization(
      data.specializations,
    );

    const newDoctor = this.buildDoctorData(
      data,
      addressInfo,
      doctorSpecializations,
    );

    const transaction = await this.dataSource.transaction(async (manager) => {
      const doctorSpecialization = await manager.save(doctorSpecializations);
      const doctor = await manager.save(newDoctor);
      return { doctorSpecialization, doctor };
    });
    return transaction.doctor;
  }

  private buildDoctorData(
    data: SaveDoctorBodyDto,
    addressInfo: IAddressInfo,
    doctorSpecializations: DoctorSpecializationEntity[],
  ) {
    const doctorEntity = new DoctorEntity();
    doctorEntity.name = data.name;
    doctorEntity.crm = data.crm;
    (doctorEntity.landlineNumber = data.landlineNumber),
      (doctorEntity.mobileNumber = data.mobileNumber),
      (doctorEntity.zipcode = data.zipcode),
      (doctorEntity.address = addressInfo.logradouro),
      (doctorEntity.complement = addressInfo.complemento),
      (doctorEntity.city = addressInfo.localidade),
      (doctorEntity.district = addressInfo.bairro),
      (doctorEntity.state = addressInfo.uf);
    doctorEntity.specializations = doctorSpecializations;
    return doctorEntity;
  }
}
