import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeleteDoctorService } from '../services/delete-doctor.service';

@Controller('doctors')
@ApiTags('doctors')
@ApiResponse({ status: 200, description: 'Médico deletado com sucesso' })
@ApiResponse({ status: 404, description: 'Médico não encontrado' })
export class DeleteDoctorController {
  constructor(private readonly deleteDoctorService: DeleteDoctorService) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar cadastro de Médicos' })
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.deleteDoctorService.delete(id);
  }
}
