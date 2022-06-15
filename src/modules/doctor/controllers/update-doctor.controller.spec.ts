import { Test, TestingModule } from '@nestjs/testing';
import { UpdateDoctorDataDto } from '../dto/doctor.dto';
import { DoctorEntity } from '../entities/doctor.entity';
import { UpdateDoctorService } from '../services/update-doctor.service';
import { UpdateDoctorController } from './update-doctor.controller';

const newDoctorEntity = new DoctorEntity();

describe('UpdateDoctorController', () => {
  let updateDoctorController: UpdateDoctorController;
  let updateDoctorService: UpdateDoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateDoctorController],
      providers: [
        {
          provide: UpdateDoctorService,
          useValue: {
            update: jest.fn().mockResolvedValueOnce(newDoctorEntity),
          },
        },
      ],
    }).compile();

    updateDoctorController = module.get<UpdateDoctorController>(
      UpdateDoctorController,
    );
    updateDoctorService = module.get<UpdateDoctorService>(UpdateDoctorService);
  });

  it('should be defined', () => {
    expect(updateDoctorController).toBeDefined();
    expect(updateDoctorService).toBeDefined();
  });

  describe('UpdateDoctorController', () => {
    it('Sould be able to update a doctor', async () => {
      const updateBody: UpdateDoctorDataDto = {
        name: 'test',
      };
      const result = await updateDoctorController.update(
        newDoctorEntity.id,
        updateBody,
      );

      expect(result).toEqual(newDoctorEntity);
    });
  });
});
