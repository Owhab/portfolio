import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEducationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  degree: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  institution: string;

  @IsString()
  @MaxLength(150)
  @IsOptional()
  location?: string;

  @IsNotEmpty()
  startDate: Date;

  @IsOptional()
  endDate?: Date;

  @IsOptional()
  isCurrent: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  sortOrder: number;

  @IsOptional()
  isActive: boolean;
}
