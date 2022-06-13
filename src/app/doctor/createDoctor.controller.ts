import { Body, Controller, Post } from '@nestjs/common';
import { CreateDoctorService } from './createDoctor.service';
import { SaveDoctorBodyDto, UpdateDoctorDataDto } from './dto/doctor.dto';

@Controller('doctors')
export class CreateDoctorController {
  constructor(private readonly doctorService: CreateDoctorService) {}

  @Post()
  async save(@Body() body: SaveDoctorBodyDto) {
    return this.doctorService.save(body);
  }
}
