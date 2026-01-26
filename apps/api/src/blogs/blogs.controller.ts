import { Body, Controller, Get } from '@nestjs/common';
import { BlogsService } from './provider/blogs.service';
import { CreateBlogDto } from './dtos/create-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(
    // Inject Blogs Service
    private readonly blogsService: BlogsService,
  ) {}

  // Find All Blogs
  @Get()
  async findAll() {
    return this.blogsService.findAll();
  }

  // Create Blog
  async create(@Body() dto: CreateBlogDto) {
    return this.blogsService.create(dto);
  }

  // Update Blog
  async update(@Body() dto: CreateBlogDto, id: number) {
    return this.blogsService.update(dto, id);
  }

  // Delete Blog
  async delete(id: number) {
    return this.blogsService.delete(id);
  }
}
