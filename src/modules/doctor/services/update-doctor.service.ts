import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DoctorEntity } from '../entities/doctor.entity';
import { UpdateDoctorDataDto } from '../dto/doctor.dto';
import { DoctorsRepository } from '../repositories/doctor.repository';
import { CepIntegrationService } from 'src/modules/cep/services/cep.service';
import { buildDoctorSpecialization } from '../utils/doctor';

@Injectable()
export class UpdateDoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: DoctorsRepository,
    private readonly cepService: CepIntegrationService,
    private dataSource: DataSource,
  ) {}

  async update(id: string, data: UpdateDoctorDataDto): Promise<DoctorEntity> {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
      relations: { specializations: true },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    if (data.crm !== undefined) {
      const crmInUse = await this.doctorRepository.findOne({
        where: { crm: data.crm },
      });
      if (crmInUse) {
        throw new BadRequestException('CRM is already in use');
      }
      doctor.crm = data.crm;
    }
    if (data.zipcode !== undefined) {
      const zipCodeInfo = await this.cepService.getAddressInfo(data.zipcode);
      doctor.address = zipCodeInfo.logradouro;
      doctor.city = zipCodeInfo.localidade;
      doctor.complement = zipCodeInfo.complemento;
      doctor.district = zipCodeInfo.bairro;
      doctor.state = zipCodeInfo.uf;
    }

    let oldSpecializations = [];
    if (data.specializations !== undefined) {
      oldSpecializations = doctor.specializations;
      const doctorSpecializations = buildDoctorSpecialization(
        data.specializations,
      );
      doctor.specializations = doctorSpecializations;
    }

    doctor.name = data.name;
    doctor.landlineNumber = data.landlineNumber;
    doctor.mobileNumber = data.mobileNumber;

    const transaction = await this.dataSource.transaction(async (manager) => {
      await manager.remove(oldSpecializations);
      await manager.save(doctor.specializations);
      const updatedDoctor = await manager.save(doctor);
      return updatedDoctor;
    });
    return transaction;
  }
}
