import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlogTagsService } from './provider/blog-tags.service';

@Controller('blog-tags')
export class BlogTagsController {
  constructor(
    // Inject Blog Tags Service
    private readonly blogTagsService: BlogTagsService,
  ) {}

  // Find All Blog Tags

  @Get()
  async findAll() {
    return this.blogTagsService.findAll();
  }

  // Create Blog Tag
  @Post()
  async create(@Body() dto: any) {
    return this.blogTagsService.create(dto);
  }
}
