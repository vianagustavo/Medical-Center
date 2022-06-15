import { Test, TestingModule } from '@nestjs/testing';
import { DeleteDoctorService } from '../services/delete-doctor.service';
import { DeleteDoctorController } from './delete-doctor.controller';

describe('DeleteDoctorController', () => {
  let deleteDoctorController: DeleteDoctorController;
  let deleteDoctorService: DeleteDoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteDoctorController],
      providers: [
        {
          provide: DeleteDoctorService,
          useValue: {
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    deleteDoctorController = module.get<DeleteDoctorController>(
      DeleteDoctorController,
    );
    deleteDoctorService = module.get<DeleteDoctorService>(DeleteDoctorService);
  });

  it('should be defined', () => {
    expect(deleteDoctorController).toBeDefined();
    expect(deleteDoctorService).toBeDefined();
  });

  describe('Delete Doctors', () => {
    it('should be able to soft delete a doctor', async () => {
      const result = await deleteDoctorController.delete('1');

      expect(result).toBeUndefined();
    });
  });
});
