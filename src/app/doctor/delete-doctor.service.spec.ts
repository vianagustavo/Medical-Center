import { Test, TestingModule } from '@nestjs/testing';
import { DeleteDoctorService } from './delete-doctor.service';

describe('DeleteDoctorService', () => {
  let service: DeleteDoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteDoctorService],
    }).compile();

    service = module.get<DeleteDoctorService>(DeleteDoctorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
