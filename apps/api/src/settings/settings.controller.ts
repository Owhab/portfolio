import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { SettingsService } from './provider/settings.service';
import { CreateSettingsDto } from './dtos/create-settings.dto';
import { UpdateSettingsDto } from './dtos/update-settings.dto';

@Controller('settings')
export class SettingsController {
  constructor(
    // Inject Settings Service
    private readonly settingsService: SettingsService,
  ) {}

  @Get()
  public async get() {
    const settings = await this.settingsService.find();
    return {
      settings,
    };
  }

  @Post()
  create(@Body() dto: CreateSettingsDto) {
    return this.settingsService.create(dto);
  }

  @Patch()
  update(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.update(dto);
  }
}
