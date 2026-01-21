import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from '../skill.entity';
import { Repository } from 'typeorm';
import { CreateSkillDto } from '../dtos/create-skill.dto';
import { UpdateSkillDto } from '../dtos/update-skill.dto';
import { SkillCategory } from 'src/skill-category/skill-category.entity';

@Injectable()
export class SkillsService {
  constructor(
    // Inject SkillsRepository
    @InjectRepository(Skill)
    public readonly skillsRepository: Repository<Skill>,

    @InjectRepository(SkillCategory)
    public readonly skillCategoryRepository: Repository<SkillCategory>,
  ) {}

  async findAll() {
    const skills = this.skillsRepository.find();
    return skills;
  }

  async createSkill(dto: CreateSkillDto) {
    const category = await this.skillCategoryRepository.findOneBy({
      id: dto.categoryId,
    });

    if (!category) {
      throw new NotFoundException('Skill category not found');
    }
    const newSkill = this.skillsRepository.create({ ...dto, category });
    await this.skillsRepository.save(newSkill);

    return {
      message: 'Skill created successfully',
      skill: newSkill,
    };
  }

  async updateSkill(dto: UpdateSkillDto, id: string) {
    const skill = await this.skillsRepository.findOneBy({ id: +id });
    if (!skill) {
      return {
        message: 'Skill not found',
      };
    }

    const updatedSkill = Object.assign(skill, dto);
    await this.skillsRepository.save(updatedSkill);

    return {
      message: 'Skill updated successfully',
      skill: updatedSkill,
    };
  }

  async deleteSkill(id: string) {
    const skill = await this.skillsRepository.findOneBy({ id: +id });
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }
    await this.skillsRepository.remove(skill);
    return {
      message: 'Skill deleted successfully',
    };
  }
}
