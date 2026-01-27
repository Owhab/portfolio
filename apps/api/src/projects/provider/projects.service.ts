import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { UploadService } from 'src/files/provider/upload.service';

@Injectable()
export class ProjectsService {
  constructor(
    // Inject Repository
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    // Inject UploadService
    private readonly uploadService: UploadService,
  ) {}

  // Find all projects
  async findAll() {
    const projects = await this.projectRepository.find();
    return {
      data: projects,
    };
  }

  // Create Project
  async create(dto: CreateProjectDto, file?: Express.Multer.File) {
    if (file) {
      const thumbnailPath = await this.uploadService.uploadImage(
        file,
        'projects',
      );
      dto.thumbnail = thumbnailPath;
    }
    const project = this.projectRepository.create(dto);
    await this.projectRepository.save(project);
    return {
      data: project,
    };
  }

  // Update Project
  async update(dto: UpdateProjectDto, id: number) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    Object.assign(project, dto);
    await this.projectRepository.save(project);
    return {
      data: project,
    };
  }

  // Delete Project
  async delete(id: number) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.projectRepository.remove(project);
    return {
      message: 'Project deleted successfully',
    };
  }
}
