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
      relations: ['tags'],
      order: { createdAt: 'DESC' },
    });
    return {
      data: blogs,
    };
  }

  // Find One by ID
  async findOne(id: number) {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
    if (!blog) {
      throw new Error('Blog not found');
    }
    return {
      data: blog,
    };
  }

  // Create Blog
  async create(dto: CreateBlogDto) {
    const { tagIds, ...blogData } = dto;

    let tags: BlogTag[] = [];
    if (tagIds && tagIds.length > 0) {
      tags = await this.blogTagRepository.findBy({ id: In(tagIds) });
    }

    const blog = this.blogRepository.create({
      ...blogData,
      tags,
      publishedAt: blogData.publishedAt
        ? new Date(blogData.publishedAt as string | number | Date)
        : new Date(),
    });
    await this.blogRepository.save(blog);
    return blog;
  }

  // Update Blog
  async update(dto: UpdateBlogDto, id: number) {
    const { tagIds, ...blogData } = dto;

    let tags: BlogTag[] = [];
    if (tagIds && tagIds.length > 0) {
      tags = await this.blogTagRepository.findBy({ id: In(tagIds) });
    }

    const blog = await this.blogRepository.preload({
      id,
      ...blogData,
      tags,
      ...(blogData.publishedAt && {
        publishedAt: new Date(blogData.publishedAt),
      }),
    });
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
