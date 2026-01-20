import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { SkillLevel } from 'src/common/enums/skill-level.enum';

export class CreateSkillDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsEnum(SkillLevel, {
    message: `Level must of one of: ${Object.values(SkillLevel).join(', ')}`,
  })
  @IsOptional()
  level?: SkillLevel;

  @IsString()
  @IsOptional()
  image?: string;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
