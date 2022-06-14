import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorEntity, DoctorSpecialization } from '../entities/doctor.entity';
import { SaveDoctorBodyDto } from '../dto/doctor.dto';
import { CreateDoctorService } from './createDoctor.service';

describe('MedicsService', () => {
  let createDoctorService: CreateDoctorService;
  let doctorRepository: Repository<DoctorEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateDoctorService,
        {
          provide: getRepositoryToken(DoctorEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    createDoctorService = module.get<CreateDoctorService>(CreateDoctorService);
    doctorRepository = module.get<Repository<DoctorEntity>>(
      getRepositoryToken(DoctorEntity),
    );
  });

  it('should be defined', () => {
    expect(createDoctorService).toBeDefined();
    expect(doctorRepository).toBeDefined();
  });

  describe('save', () => {
    it('should save a new doctor with success', async () => {
      const data: SaveDoctorBodyDto = {
        name: 'Gustavo Ferreira Viana',
        zipcode: 22793810,
        crm: '123567',
        landlineNumber: 22881861,
        mobileNumber: 984034502,
        medicalSpecialization: [
          DoctorSpecialization.ALERGOLOGIA,
          DoctorSpecialization.ANGIOLOGIA,
        ],
      };
      const doctorEntityMock = {
        ...data,
      } as DoctorEntity;

      jest
        .spyOn(doctorRepository, 'create')
        .mockReturnValueOnce(doctorEntityMock);
      jest
        .spyOn(doctorRepository, 'save')
        .mockResolvedValueOnce(doctorEntityMock);
      const result = await createDoctorService.save(data);

      expect(result).toBeDefined();
      expect(doctorRepository.create).toBeCalledTimes(1);
      expect(doctorRepository.save).toBeCalledTimes(1);
    });
  });
});
