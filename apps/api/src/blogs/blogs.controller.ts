import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BlogsService } from './provider/blogs.service';
import { CreateBlogDto } from './dtos/create-blog.dto';
import { UpdateBlogDto } from './dtos/update-blog.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('blogs')
export class BlogsController {
  constructor(
    // Inject Blogs Service
    private readonly blogsService: BlogsService,
  ) {}

  // Find All Blogs
  @Public()
  @Get()
  async findAll() {
    return this.blogsService.findAll();
  }

  // Find One Blog by ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.blogsService.findOne(id);
  }

  // Create Blog
  @Post()
  async create(@Body() dto: CreateBlogDto) {
    return this.blogsService.create(dto);
  }

  // Update Blog
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBlogDto,
  ) {
    return this.blogsService.update(dto, id);
  }

  // Delete Blog
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.blogsService.delete(id);
  }
}
