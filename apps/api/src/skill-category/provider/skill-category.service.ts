import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillCategory } from '../skill-category.entity';
import { Repository } from 'typeorm';
import { CreateSkillCategoryDto } from '../dtos/create-skill-category.dto';
import { UpdateSkillCategoryDto } from '../dtos/update-skill-category.dto';

@Injectable()
export class SkillCategoryService {
  constructor(
    // Inject SkillCategoryRepository
    @InjectRepository(SkillCategory)
    public readonly skillCategoryRepository: Repository<SkillCategory>,
  ) {}

  // Get all Skill Categories
  async findAll() {
    const categories = await this.skillCategoryRepository.find({
      where: { isActive: true },
      relations: ['skills'],
      order: {
        sortOrder: 'ASC',
        skills: {
          order: 'ASC',
        },
      },
    });

    return {
      data: categories,
    };
  }

  // Create Skill Category
  async create(dto: CreateSkillCategoryDto) {
    const category = this.skillCategoryRepository.create(dto);
    return this.skillCategoryRepository.save(category);
  }

  // update skill category
  async update(dto: UpdateSkillCategoryDto, id: number) {
    const category = await this.skillCategoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Skill Category not found');
    }

    Object.assign(category, dto);
    return this.skillCategoryRepository.save(category);
  }

  // delete skill category
  async delete(id: number) {
    const category = await this.skillCategoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Skill Category not found');
    }

    return this.skillCategoryRepository.remove(category);
  }
}
