import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './provider/blogs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { BlogTag } from 'src/blog-tags/blog-tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog]),
    TypeOrmModule.forFeature([BlogTag]),
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
