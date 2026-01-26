import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SkillCategoryService } from './provider/skill-category.service';
import { CreateSkillCategoryDto } from './dtos/create-skill-category.dto';
import { UpdateSkillCategoryDto } from './dtos/update-skill-category.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('skill-category')
export class SkillCategoryController {
  constructor(
    // Inject services
    private readonly skillCategoryService: SkillCategoryService,
  ) {}

  // Get all skill categories
  @Public()
  @Get()
  async getAllSkillCategories() {
    return this.skillCategoryService.findAll();
  }

  // Create skill category
  @Post()
  async createSkillCategory(@Body() dto: CreateSkillCategoryDto) {
    return this.skillCategoryService.create(dto);
  }

  // Update Skill Category
  @Patch(':id')
  async updateSkillCategory(
    @Body() dto: UpdateSkillCategoryDto,
    @Param('id') id: number,
  ) {
    return this.skillCategoryService.update(dto, id);
  }

  // Delete Skill Category
  @Delete(':id')
  async deleteSkillCategory(id: number) {
    return this.skillCategoryService.delete(id);
  }
}
