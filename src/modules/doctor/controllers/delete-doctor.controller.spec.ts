import { Test, TestingModule } from '@nestjs/testing';
import { DeleteDoctorController } from './delete-doctor.controller';

describe('DeleteDoctorController', () => {
  let controller: DeleteDoctorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteDoctorController],
    }).compile();

    controller = module.get<DeleteDoctorController>(DeleteDoctorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
