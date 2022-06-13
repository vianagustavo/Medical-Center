import { Body, Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { UpdateDoctorDataDto } from './dto/doctor.dto';
import { UpdateDoctorService } from './update-doctor.service';

@Controller('doctors')
export class UpdateDoctorController {
  constructor(private readonly updateDoctorService: UpdateDoctorService) {}

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateDoctorDataDto,
  ) {
    return this.updateDoctorService.update(id, body);
  }
}
