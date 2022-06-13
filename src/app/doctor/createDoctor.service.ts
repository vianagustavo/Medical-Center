import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ViaCepIntegration } from 'src/integrations/viacep';
import { Repository } from 'typeorm';
import { DoctorEntity } from './doctor.entity';
import { SaveDoctorDataDto, SaveDoctorBodyDto } from './dto/doctor.dto';

@Injectable()
export class CreateDoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
    private httpService: HttpService,
  ) {}

  async save(data: SaveDoctorBodyDto): Promise<DoctorEntity> {
    const doctor = await this.doctorRepository.findOne({
      where: { name: data.name, crm: data.crm },
    });

    if (doctor) {
      throw new BadRequestException('Doctor is already registered');
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

    return this.doctorRepository.save(this.doctorRepository.create(info));
  }
}
