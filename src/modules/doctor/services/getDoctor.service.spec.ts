import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetDoctorFilters } from '../dto/doctor.dto';
import { DoctorEntity } from '../entities/doctor.entity';
import { DoctorsRepository } from '../repositories/doctor.repository';
import { GetDoctorService } from './getDoctor.service';

const doctorEntityList: DoctorEntity[] = [new DoctorEntity()];

describe('GetDoctorService', () => {
  let getDoctorService: GetDoctorService;
  let doctorRepository: DoctorsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetDoctorService,
        {
          provide: getRepositoryToken(DoctorEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(doctorEntityList),
          },
        },
      ],
    }).compile();

    getDoctorService = module.get<GetDoctorService>(GetDoctorService);
    doctorRepository = module.get<DoctorsRepository>(
      getRepositoryToken(DoctorEntity),
    );
  });

  it('should be defined', () => {
    expect(getDoctorService).toBeDefined();
    expect(doctorRepository).toBeDefined();
  });
  describe('find', () => {
    it('should be able to return a doctor list entity successfully', async () => {
      const filters: GetDoctorFilters = {
        name: 'test',
      };
      const result = await getDoctorService.getDoctors(filters);

      expect(result).toEqual(doctorEntityList);
    });
  });
});
