import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  CepIntegrationService,
  IAddressInfo,
} from 'src/modules/cep/services/cep.service';
import { DataSource } from 'typeorm';
import { UpdateDoctorDataDto } from '../dto/doctor.dto';
import { DoctorEntity } from '../entities/doctor.entity';
import { DoctorsRepository } from '../repositories/doctor.repository';
import { UpdateDoctorService } from './update-doctor.service';

const doctorEntity: DoctorEntity = new DoctorEntity();
const addressInfo: IAddressInfo = {
  cep: '22793810',
  logradouro: 'av. luiz aranha',
  complemento: 'apt',
  bairro: 'barra da tijuca',
  localidade: 'rio de janeiro',
  uf: 'rj',
};

describe('UpdateDoctorService', () => {
  let updateDoctorService: UpdateDoctorService;
  let doctorRepository: DoctorsRepository;
  let cepIntegrationService: CepIntegrationService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateDoctorService,
        {
          provide: getRepositoryToken(DoctorEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(doctorEntity),
          },
        },
        {
          provide: CepIntegrationService,
          useValue: {
            getAddressInfo: jest.fn().mockResolvedValue(addressInfo),
          },
        },
        {
          provide: DataSource,
          useValue: {
            transaction: jest.fn().mockReturnThis(),
          },
        },
      ],
    }).compile();

    updateDoctorService = module.get<UpdateDoctorService>(UpdateDoctorService);
    doctorRepository = module.get<DoctorsRepository>(
      getRepositoryToken(DoctorEntity),
    );
    cepIntegrationService = module.get<CepIntegrationService>(
      CepIntegrationService,
    );
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(updateDoctorService).toBeDefined();
    expect(doctorRepository).toBeDefined();
    expect(cepIntegrationService).toBeDefined();
    expect(dataSource).toBeDefined();
  });
});
