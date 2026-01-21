import { Module } from '@nestjs/common';
import { SkillCategoryController } from './skill-category.controller';
import { SkillCategoryService } from './provider/skill-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillCategory } from './skill-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkillCategory])],
  controllers: [SkillCategoryController],
  providers: [SkillCategoryService],
  exports: [SkillCategoryService, TypeOrmModule],
})
export class SkillCategoryModule {}
