import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './provider/skills.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { SkillCategoryModule } from 'src/skill-category/skill-category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Skill]), SkillCategoryModule],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
