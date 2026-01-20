import { Controller, Get } from '@nestjs/common';
import { SettingsService } from './provider/settings.service';

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
}
