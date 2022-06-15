import { Test, TestingModule } from '@nestjs/testing';
import { GetDoctorFilters } from '../dto/doctor.dto';
import { DoctorEntity } from '../entities/doctor.entity';
import { GetDoctorService } from '../services/getDoctor.service';
import { GetDoctorController } from './getDoctor.controller';

const getDoctorList: DoctorEntity[] = [new DoctorEntity()];

describe('GetDoctorController', () => {
  let getDoctorController: GetDoctorController;
  let getDoctorService: GetDoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetDoctorController],
      providers: [
        {
          provide: GetDoctorService,
          useValue: {
            getDoctors: jest.fn().mockResolvedValue(getDoctorList),
          },
        },
      ],
    }).compile();

    getDoctorController = module.get<GetDoctorController>(GetDoctorController);
    getDoctorService = module.get<GetDoctorService>(GetDoctorService);
  });

  it('should be defined', () => {
    expect(getDoctorController).toBeDefined();
    expect(getDoctorService).toBeDefined();
  });

  describe('Get Doctors', () => {
    it('should be able to return a list of doctors sucessfully', async () => {
      const filters: GetDoctorFilters = {
        name: 'test',
      };
      const result = await getDoctorController.getDoctors(filters);

      expect(result).toEqual(getDoctorList);
    });
  });
});
