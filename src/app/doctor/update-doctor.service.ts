import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ViaCepIntegration } from 'src/integrations/viacep';
import { Repository, UpdateResult } from 'typeorm';
import { DoctorEntity } from './doctor.entity';
import { ISaveDoctorDataDto, UpdateDoctorDataDto } from './dto/doctor.dto';

@Injectable()
export class UpdateDoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
    private httpService: HttpService,
  ) {}

  async update(id: string, data: UpdateDoctorDataDto): Promise<UpdateResult> {
    try {
      await this.doctorRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    if (data.zipcode === undefined) {
      return await this.doctorRepository.update({ id }, data);
    }
    const viaCepClient = new ViaCepIntegration(this.httpService);
    const zipCodeInfo = await viaCepClient.getAddressInfo(data.zipcode);
    const info: ISaveDoctorDataDto = {
      name: data.name,
      crm: data.crm,
      medicalSpecialization: data.medicalSpecialization,
      landlineNumber: data.landlineNumber,
      mobileNumber: data.mobileNumber,
      zipcode: data.zipcode,
      address: zipCodeInfo.logradouro,
      complement: zipCodeInfo.complemento,
      city: zipCodeInfo.localidade,
      district: zipCodeInfo.bairro,
      state: zipCodeInfo.uf,
    };
    return await this.doctorRepository.update({ id }, info);
  }
}
