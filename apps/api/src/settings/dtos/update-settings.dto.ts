import { CreateSettingsDto } from './create-settings.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateSettingsDto extends PartialType(CreateSettingsDto) {}
