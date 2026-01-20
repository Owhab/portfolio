import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Education } from '../education.entity';
import { Repository } from 'typeorm';
import { CreateEducationDto } from '../dtos/create-education.dto';
import { UpdateEducationDto } from '../dtos/update-education.dto';

@Injectable()
export class EducationsService {
  constructor(
    // Inject Repository
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
  ) {}

  // find all educations
  async findAll() {
    return this.educationRepository.find();
  }

  // create education
  async create(dto: CreateEducationDto) {
    const education = this.educationRepository.create(dto);
    await this.educationRepository.save(education);

    return {
      data: education,
      message: 'Education created successfully',
    };
  }

  // update education
  async update(dto: UpdateEducationDto, id: number) {
    const education = await this.educationRepository.findOneBy({ id });
    if (!education) {
      throw new NotFoundException('Education not found');
    }

    Object.assign(education, dto);
    await this.educationRepository.save(education);

    return {
      data: education,
      message: 'Education updated successfully',
    };
  }

  // delete education
  async delete(id: number) {
    const education = await this.educationRepository.findOneBy({ id });
    if (!education) {
      throw new NotFoundException('Education not found');
    }

    await this.educationRepository.remove(education);

    return {
      message: 'Education deleted successfully',
    };
  }
}
