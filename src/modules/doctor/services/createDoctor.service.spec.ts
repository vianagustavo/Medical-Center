import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DoctorEntity } from '../entities/doctor.entity';
import { CreateDoctorService } from './createDoctor.service';
import { DoctorsRepository } from '../repositories/doctor.repository';
import {
  CepIntegrationService,
  IAddressInfo,
} from 'src/modules/cep/services/cep.service';
import { DataSource } from 'typeorm';

const doctorEntity: DoctorEntity = new DoctorEntity();
const addressInfo: IAddressInfo = {
  cep: '22793810',
  logradouro: 'av. luiz aranha',
  complemento: 'apt',
  bairro: 'barra da tijuca',
  localidade: 'rio de janeiro',
  uf: 'rj',
};

describe('MedicsService', () => {
  let createDoctorService: CreateDoctorService;
  let doctorRepository: DoctorsRepository;
  let cepIntegrationService: CepIntegrationService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateDoctorService,
        {
          provide: getRepositoryToken(DoctorEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(null),
            save: jest.fn().mockResolvedValue(doctorEntity),
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

    createDoctorService = module.get<CreateDoctorService>(CreateDoctorService);
    doctorRepository = module.get<DoctorsRepository>(
      getRepositoryToken(DoctorEntity),
    );
    cepIntegrationService = module.get<CepIntegrationService>(
      CepIntegrationService,
    );
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(createDoctorService).toBeDefined();
    expect(doctorRepository).toBeDefined();
    expect(cepIntegrationService).toBeDefined();
    expect(dataSource).toBeDefined();
  });
});
