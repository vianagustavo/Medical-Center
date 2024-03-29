import { Body, Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateDoctorDataDto } from '../dto/doctor.dto';
import { UpdateDoctorService } from '../services/update-doctor.service';

@Controller('doctors')
@ApiTags('doctors')
@ApiResponse({ status: 200, description: 'Dados atualizados com sucesso' })
@ApiResponse({ status: 404, description: 'Médico não encontrado' })
export class UpdateDoctorController {
  constructor(private readonly updateDoctorService: UpdateDoctorService) {}

  @Put(':id')
  @ApiOperation({ summary: 'Atualização de dados de Médicos' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateDoctorDataDto,
  ) {
    return this.updateDoctorService.update(id, body);
  }
}
