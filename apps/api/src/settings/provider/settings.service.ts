import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from '../settings.entity';
import { CreateSettingsDto } from '../dtos/create-settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    // Inject Settings Repository
    @InjectRepository(Settings)
    private readonly settingsReposity: Repository<Settings>,
  ) {}

  async find() {
    return await this.settingsReposity.find();
  }

  async create(dto: CreateSettingsDto) {
    // 🔒 Ensure only one settings record exists
    const existingSettings = await this.settingsReposity.findOne({
      where: {},
    });

    if (existingSettings) {
      throw new BadRequestException(
        'Settings already exists. Use update instead.',
      );
    }

    const settings = this.settingsReposity.create(dto);
    return await this.settingsReposity.save(settings);
  }
}
