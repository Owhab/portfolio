import { Module } from '@nestjs/common';
import { BlogTagsController } from './blog-tags.controller';
import { BlogTagsService } from './provider/blog-tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogTag } from './blog-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogTag])],
  controllers: [BlogTagsController],
  providers: [BlogTagsService],
})
export class BlogTagsModule {}
