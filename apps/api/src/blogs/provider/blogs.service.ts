import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from '../blog.entity';
import { In, Repository } from 'typeorm';
import { BlogTag } from 'src/blog-tags/blog-tag.entity';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { UpdateBlogDto } from '../dtos/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    // Inject Blog Repository
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,

    // Inject BlogTag Repository
    @InjectRepository(BlogTag)
    private readonly blogTagRepository: Repository<BlogTag>,
  ) {}

  // Find All
  async findAll() {
    const blogs = await this.blogRepository.find({
      where: { isPublished: true },
      relations: ['tags'],
    });
    return {
      data: blogs,
    };
  }

  // Create Blog
  async create(dto: CreateBlogDto) {
    let tags: BlogTag[] = [];
    if (dto.tagIds && dto.tagIds.length > 0) {
      tags = await this.blogTagRepository.findBy({ id: In(dto.tagIds) });
    }

    const blog = this.blogRepository.create({ ...dto, tags });
    await this.blogRepository.save(blog);
    return blog;
  }

  // Update Blog
  async update(dto: UpdateBlogDto, id: number) {
    let tags: BlogTag[] = [];
    if (dto.tagIds && dto.tagIds.length > 0) {
      tags = await this.blogTagRepository.findBy({ id: In(dto.tagIds) });
    }

    const blog = await this.blogRepository.preload({ id, ...dto, tags });
    if (!blog) {
      throw new Error('Blog not found');
    }
    await this.blogRepository.save(blog);
    return blog;
  }

  // Delete Blog
  async delete(id: number) {
    const blog = await this.blogRepository.findOneBy({ id });
    if (!blog) {
      throw new Error('Blog not found');
    }
    await this.blogRepository.remove(blog);
    return { message: 'Blog deleted successfully' };
  }
}
