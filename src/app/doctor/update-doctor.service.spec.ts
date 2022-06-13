import { Test, TestingModule } from '@nestjs/testing';
import { UpdateDoctorService } from './update-doctor.service';

describe('UpdateDoctorService', () => {
  let service: UpdateDoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateDoctorService],
    }).compile();

    service = module.get<UpdateDoctorService>(UpdateDoctorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
