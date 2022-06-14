import { Controller, Get, Query } from '@nestjs/common';
import { GetDoctorService } from '../services/getDoctor.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetDoctorFilters, SaveDoctorBodyDto } from '../dto/doctor.dto';

@Controller('doctors')
@ApiTags('doctors')
@ApiResponse({
  status: 200,
  description: 'Médicos listados com sucesso',
  type: SaveDoctorBodyDto,
  isArray: true,
})
export class GetDoctorController {
  constructor(private readonly getDoctorService: GetDoctorService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os Médicos' })
  async getDoctors(@Query() filters: GetDoctorFilters) {
    return this.getDoctorService.getDoctors(filters);
  }
}
