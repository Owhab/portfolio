import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './provider/skills.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
