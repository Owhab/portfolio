import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './provider/files.service';
import { UploadService } from './provider/upload.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService, UploadService],
  exports: [UploadService],
})
export class FilesModule {}
