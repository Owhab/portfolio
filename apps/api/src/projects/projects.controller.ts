import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ProjectsService } from './provider/projects.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(
    // Inject ProjectsService
    private readonly projectsService: ProjectsService,
  ) {}

  // get projects
  @Get()
  async findAll() {
    return this.projectsService.findAll();
  }

  // create project
  @Post()
  async create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  // Update Project
  @Patch(':id')
  async update(@Body() dto: UpdateProjectDto, id: number) {
    return this.projectsService.update(dto, id);
  }

  // Delete Project
  @Delete(':id')
  async delete(id: number) {
    return this.projectsService.delete(id);
  }
}
