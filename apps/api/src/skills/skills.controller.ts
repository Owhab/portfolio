import { Body, Controller, Get, Post } from '@nestjs/common';
import { SkillsService } from './provider/skills.service';
import { CreateSkillDto } from './dtos/create-skill.dto';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  async get() {
    return this.skillsService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateSkillDto) {
    return await this.skillsService.createSkill(dto);
  }
}
