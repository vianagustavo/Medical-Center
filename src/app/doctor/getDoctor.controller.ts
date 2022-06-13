import { Controller, Get } from '@nestjs/common';
import { GetDoctorService } from './getDoctor.service';

@Controller('doctors')
export class GetDoctorController {
  constructor(private readonly getDoctorService: GetDoctorService) {}

  @Get()
  async getDoctors() {
    return this.getDoctorService.getDoctors();
  }
}
