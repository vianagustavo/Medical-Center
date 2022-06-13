import { Body, Controller, Post } from '@nestjs/common';
import { CreateDoctorService } from './createDoctor.service';
import { SaveDoctorBodyDto, SaveDoctorDataDto } from './dto/doctor.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('doctors')
@ApiTags('doctors')
@ApiResponse({
  status: 201,
  description: 'Criação de Médico bem sucedida',
  type: SaveDoctorDataDto,
})
@ApiResponse({ status: 400, description: 'Médico já cadastrado' })
export class CreateDoctorController {
  constructor(private readonly doctorService: CreateDoctorService) {}

  @Post()
  @ApiOperation({ summary: 'Criação de Médicos' })
  async save(@Body() body: SaveDoctorBodyDto) {
    return this.doctorService.save(body);
  }
}
