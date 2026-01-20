import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './provider/settings.service';
import { Settings } from './settings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Settings])],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
