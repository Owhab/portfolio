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
import { BlogTagsService } from './provider/blog-tags.service';
import { CreateBlogTagDto } from './dtos/create-blog-tag.dto';
import { UpdateBlogTagDto } from './dtos/update-blog-tag.dto';

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
  async create(@Body() dto: CreateBlogTagDto) {
    return this.blogTagsService.create(dto);
  }

  // Update Blog Tag
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBlogTagDto,
  ) {
    return this.blogTagsService.update(id, dto);
  }

  // Delete Blog Tag
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.blogTagsService.delete(id);
  }
}
