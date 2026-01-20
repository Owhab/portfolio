import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from '../settings.entity';

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
}
