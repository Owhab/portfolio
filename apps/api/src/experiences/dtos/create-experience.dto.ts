import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  location: string;

  @IsNotEmpty()
  startDate: Date;

  @IsOptional()
  endDate?: Date | null;

  @IsString()
  @MaxLength(2000)
  @IsOptional()
  description?: string | null;

  @IsNotEmpty()
  isCurrent: boolean;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  techStack?: string;

  @IsOptional()
  sortOrder?: number;

  @IsOptional()
  isActive?: boolean;
}
