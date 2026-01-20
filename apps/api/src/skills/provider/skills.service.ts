import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from '../skill.entity';
import { Repository } from 'typeorm';
import { CreateSkillDto } from '../dtos/create-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    // Inject SkillsRepository
    @InjectRepository(Skill)
    public readonly skillsRepository: Repository<Skill>,
  ) {}

  async findAll() {
    const skills = this.skillsRepository.find();
    return skills;
  }

  async createSkill(dto: CreateSkillDto) {
    const newSkill = this.skillsRepository.create(dto);
    await this.skillsRepository.save(newSkill);

    return {
      message: 'Skill created successfully',
      skill: newSkill,
    };
  }
}
