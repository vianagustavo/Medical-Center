import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DoctorEntity } from '../entities/doctor.entity';
import { DoctorsRepository } from '../repositories/doctor.repository';
import { DeleteDoctorService } from './delete-doctor.service';

const doctorEntity: DoctorEntity = new DoctorEntity();

describe('DeleteDoctorService', () => {
  let deleteDoctorService: DeleteDoctorService;
  let doctorRepository: DoctorsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteDoctorService,
        {
          provide: getRepositoryToken(DoctorEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(doctorEntity),
            softDelete: jest.fn().mockResolvedValue(doctorEntity.id),
          },
        },
      ],
    }).compile();

    deleteDoctorService = module.get<DeleteDoctorService>(DeleteDoctorService);
    doctorRepository = module.get<DoctorsRepository>(
      getRepositoryToken(DoctorEntity),
    );
  });

  it('should be defined', () => {
    expect(deleteDoctorService).toBeDefined();
    expect(doctorRepository).toBeDefined();
  });

  describe('Delete Doctors', () => {
    it('should be able to soft delete a doctor', async () => {
      const result = await deleteDoctorService.delete('1');

      expect(result).toBeUndefined();
    });
  });
});
