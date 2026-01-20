import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ExperiencesService } from './provider/experiences.service';
import { CreateExperienceDto } from './dtos/create-experience.dto';
import { UpdateExperienceDto } from './dtos/update-experience.dto';

@Controller('experiences')
export class ExperiencesController {
  constructor(
    // Inject ExperiencesService
    private readonly experiencesService: ExperiencesService,
  ) {}

  // get all experiences
  @Get()
  async findAll() {
    return this.experiencesService.findAll();
  }

  // create new experience
  @Post()
  async create(@Body() dto: CreateExperienceDto) {
    return this.experiencesService.create(dto);
  }

  // update experience
  @Patch(':id')
  async update(@Body() dto: UpdateExperienceDto, @Param('id') id: string) {
    return this.experiencesService.update(dto, id);
  }

  // delete experience
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.experiencesService.delete(id);
  }
}
