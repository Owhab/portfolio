import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectsService } from './provider/projects.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

@Controller('projects')
export class ProjectsController {
  constructor(
    // Inject ProjectsService
    private readonly projectsService: ProjectsService,
  ) {}

  // get projects
  @Public()
  @Get()
  async findAll() {
    return this.projectsService.findAll();
  }

  // create project
  @Post()
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: multer.memoryStorage(),
      limits: { fileSize: 2 * 1024 * 1024 }, // 5MB limit
    }),
  )
  async create(
    @Body() dto: CreateProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.projectsService.create(dto, file);
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
