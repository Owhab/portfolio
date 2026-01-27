import {
  IsBoolean,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MaxLength(150)
  title: string;

  @IsString()
  @MaxLength(255)
  description: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  longDescription: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  thumbnail?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  techStack: string;

  @IsString()
  @MaxLength(255)
  liveUrl: string;

  @IsString()
  @MaxLength(255)
  githubUrl: string;

  @Max(1000)
  sortOrder: number;

  @IsBoolean()
  @IsOptional()
  isFeatured: boolean;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
