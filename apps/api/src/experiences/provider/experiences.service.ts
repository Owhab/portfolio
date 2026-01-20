import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from '../experience.entity';
import { Repository } from 'typeorm';
import { CreateExperienceDto } from '../dtos/create-experience.dto';
import { UpdateExperienceDto } from '../dtos/update-experience.dto';

@Injectable()
export class ExperiencesService {
  constructor(
    // Inject Repository
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
  ) {}

  // get all experiences
  async findAll() {
    const experiences = await this.experienceRepository.find();
    return {
      data: experiences,
    };
  }

  // create new experience
  async create(dto: CreateExperienceDto) {
    const experience = this.experienceRepository.create(dto);
    await this.experienceRepository.save(experience);
    return {
      data: experience,
    };
  }

  // update experience
  async update(dto: UpdateExperienceDto, id: string) {
    const experience = await this.experienceRepository.findOneBy({
      id: parseInt(id, 10),
    });
    if (!experience) {
      throw new NotFoundException('Experience not found');
    }
    Object.assign(experience, dto);
    await this.experienceRepository.save(experience);
    return {
      data: experience,
    };
  }

  // delete experience
  async delete(id: string) {
    const experience = await this.experienceRepository.findOneBy({
      id: parseInt(id, 10),
    });
    if (!experience) {
      throw new NotFoundException('Experience not found');
    }
    await this.experienceRepository.remove(experience);
    return {
      data: experience,
    };
  }
}
