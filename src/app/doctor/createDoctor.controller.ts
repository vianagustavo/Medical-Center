import { Body, Controller, Post } from '@nestjs/common';
import { CreateDoctorService } from './createDoctor.service';
import { SaveDoctorDto } from './dto/save-doctor.dto';

@Controller('doctors')
export class CreateDoctorController {
  constructor(private readonly doctorService: CreateDoctorService) {}

  @Post()
  async save(@Body() body: SaveDoctorDto) {
    return this.doctorService.save(body);
  }
}
