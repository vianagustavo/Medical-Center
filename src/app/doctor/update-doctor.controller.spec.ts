import { Test, TestingModule } from '@nestjs/testing';
import { UpdateDoctorController } from './update-doctor.controller';

describe('UpdateDoctorController', () => {
  let controller: UpdateDoctorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateDoctorController],
    }).compile();

    controller = module.get<UpdateDoctorController>(UpdateDoctorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
