import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BlogTag } from '../blog-tag.entity';
import { Repository } from 'typeorm';
import { CreateBlogTagDto } from '../dtos/create-blog-tag.dto';

@Injectable()
export class BlogTagsService {
  constructor(
    // Inject Blog Tag Repository
    @InjectRepository(BlogTag)
    private readonly blogTagRepository: Repository<BlogTag>,
  ) {}

  // Find All Blog Tags
  async findAll() {
    const tags = await this.blogTagRepository.find();
    return {
      data: tags,
    };
  }

  // Create Blog Tag
  async create(dto: CreateBlogTagDto) {
    const tag = this.blogTagRepository.create(dto);
    await this.blogTagRepository.save(tag);
    return tag;
  }
}
