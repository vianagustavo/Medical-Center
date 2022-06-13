import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { DeleteDoctorService } from './delete-doctor.service';

@Controller('doctors')
export class DeleteDoctorController {
  constructor(private readonly deleteDoctorService: DeleteDoctorService) {}

  @Delete(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.deleteDoctorService.delete(id);
  }
}
