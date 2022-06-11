import { Test, TestingModule } from '@nestjs/testing';
import { CreateDoctorController } from './createDoctor.controller';
import { CreateDoctorService } from './createDoctor.service';
import { DoctorEntity } from './doctor.entity';
import { SaveDoctorDto } from './dto/save-doctor.dto';

describe('DoctorsController', () => {
  let createDoctorController: CreateDoctorController;
  let createDoctorService: CreateDoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateDoctorController],
      providers: [
        {
          provide: CreateDoctorService,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    createDoctorController = module.get<CreateDoctorController>(
      CreateDoctorController,
    );
    createDoctorService = module.get<CreateDoctorService>(CreateDoctorService);
  });

  it('should be defined', () => {
    expect(createDoctorController).toBeDefined();
    expect(createDoctorService).toBeDefined();
  });

  describe('save', () => {
    it('should be able to save a new doctor with success', async () => {
      const body: SaveDoctorDto = {
        name: 'Gustavo Ferreira Viana',
        cep: 22793810,
        crm: '123567',
        landlineNumber: 22881861,
        mobileNumber: 984034502,
      };
      const doctorEntityMock = {
        ...body,
      } as DoctorEntity;

      jest
        .spyOn(createDoctorService, 'save')
        .mockResolvedValueOnce(doctorEntityMock);

      const result = await createDoctorController.save(body);

      expect(result).toBeDefined();
      expect(createDoctorService.save).toBeCalledTimes(1);
    });
  });
});
