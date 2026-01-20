import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { EducationsService } from './provider/educations.service';
import { CreateEducationDto } from './dtos/create-education.dto';

@Controller('educations')
export class EducationsController {
  constructor(
    // Inject EducationsService
    private readonly educationsService: EducationsService,
  ) {}

  // get all educations
  @Get()
  async findAll() {
    return this.educationsService.findAll();
  }

  // create education
  @Post()
  async create(@Body() dto: CreateEducationDto) {
    return this.educationsService.create(dto);
  }

  // Update Education
  @Patch(':id')
  async update(@Body() dto: CreateEducationDto, id: number) {
    return this.educationsService.update(dto, id);
  }

  // Delete Education
  @Delete(':id')
  async delete(id: number) {
    return this.educationsService.delete(id);
  }
}
