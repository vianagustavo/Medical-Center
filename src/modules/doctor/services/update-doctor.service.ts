import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ViaCepIntegration } from 'src/integrations/viacep';
import { UpdateResult } from 'typeorm';
import { DoctorEntity } from '../entities/doctor.entity';
import { SaveDoctorDataDto, UpdateDoctorDataDto } from '../dto/doctor.dto';
import { DoctorsRepository } from '../repositories/DoctorRepository';

@Injectable()
export class UpdateDoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: DoctorsRepository,
    private httpService: HttpService,
  ) {}

  async update(id: string, data: UpdateDoctorDataDto): Promise<UpdateResult> {
    const doctor = await this.doctorRepository.findOne({ where: { id } });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    if (data.zipcode === undefined) {
      return await this.doctorRepository.update({ id }, data);
    }
    const viaCepClient = new ViaCepIntegration(this.httpService);
    const zipCodeInfo = await viaCepClient.getAddressInfo(data.zipcode);
    const info: SaveDoctorDataDto = {
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

    const updatedDoctor = await this.doctorRepository.update({ id }, info);
    return updatedDoctor.raw;
  }
}
