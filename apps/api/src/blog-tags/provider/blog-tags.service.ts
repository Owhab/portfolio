import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BlogTag } from '../blog-tag.entity';
import { Repository } from 'typeorm';
import { CreateBlogTagDto } from '../dtos/create-blog-tag.dto';
import { UpdateBlogTagDto } from '../dtos/update-blog-tag.dto';

@Injectable()
export class BlogTagsService {
  constructor(
    // Inject Blog Tag Repository
    @InjectRepository(BlogTag)
    private readonly blogTagRepository: Repository<BlogTag>,
  ) {}

  // Find All Blog Tags
  async findAll() {
    const tags = await this.blogTagRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
    return {
      data: tags,
    };
  }

  // Create Blog Tag
  async create(dto: CreateBlogTagDto) {
    const tag = this.blogTagRepository.create(dto);
    await this.blogTagRepository.save(tag);
    return {
      data: tag,
    };
  }

  // Update Blog Tag
  async update(id: number, dto: UpdateBlogTagDto) {
    const tag = await this.blogTagRepository.preload({ id, ...dto });
    if (!tag) {
      throw new Error('Blog tag not found');
    }
    await this.blogTagRepository.save(tag);
    return {
      data: tag,
    };
  }

  // Delete Blog Tag
  async delete(id: number) {
    const tag = await this.blogTagRepository.findOneBy({ id });
    if (!tag) {
      throw new Error('Blog tag not found');
    }
    await this.blogTagRepository.remove(tag);
    return { message: 'Blog tag deleted successfully' };
  }
}
