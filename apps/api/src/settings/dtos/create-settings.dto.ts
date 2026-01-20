import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  IsHexColor,
} from 'class-validator';
import { Language } from 'src/common/enums/language.enum';

export class CreateSettingsDto {
  @IsString()
  @IsNotEmpty()
  siteName: string;

  @IsString()
  @IsNotEmpty()
  siteShortName: string;

  @IsString()
  @IsNotEmpty()
  siteDescription: string;

  @IsUrl()
  siteUrl: string;

  @IsString()
  @IsNotEmpty()
  siteLogo: string;

  @IsString()
  @IsNotEmpty()
  favicon: string;

  @IsHexColor()
  themeColor: string;

  @IsEnum(Language)
  defaultLanguage: Language;
}
