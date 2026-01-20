import { Module } from '@nestjs/common';
import { EducationsController } from './educations.controller';
import { EducationsService } from './provider/educations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from './education.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Education])],
  controllers: [EducationsController],
  providers: [EducationsService],
})
export class EducationsModule {}
