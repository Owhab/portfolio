import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SkillsService } from './provider/skills.service';
import { CreateSkillDto } from './dtos/create-skill.dto';
import { UpdateSkillDto } from './dtos/update-skill.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Public()
  @Get()
  async get() {
    return this.skillsService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateSkillDto) {
    return await this.skillsService.createSkill(dto);
  }

  @Patch(':id')
  async update(@Body() dto: UpdateSkillDto, @Param('id') id: string) {
    return await this.skillsService.updateSkill(dto, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.skillsService.deleteSkill(id);
  }
}
