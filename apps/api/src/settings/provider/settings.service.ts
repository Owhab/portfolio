import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from '../settings.entity';
import { CreateSettingsDto } from '../dtos/create-settings.dto';
import { UpdateSettingsDto } from '../dtos/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    // Inject Settings Repository
    @InjectRepository(Settings)
    private readonly settingsReposity: Repository<Settings>,
  ) {}

  // get settings
  async find() {
    return await this.settingsReposity.find();
  }

  // create settings
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

  // update settings
  async update(dto: UpdateSettingsDto) {
    const settings = await this.settingsReposity.findOne({
      where: {},
    });

    if (!settings) {
      throw new NotFoundException('Settings not found. Please create one.');
    }

    Object.assign(settings, dto);
    return await this.settingsReposity.save(settings);
  }
}
