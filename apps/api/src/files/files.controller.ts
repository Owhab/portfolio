import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './provider/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dtos/upload-file.dto';
import multer from 'multer';
import { FileValidationPipe } from 'src/common/pipes/file-validation.pipe';

@Controller('files')
export class FilesController {
  constructor(
    // Inject FileService
    private readonly filesService: FilesService,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(),
      limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
    }),
  )
  async uploadFile(
    @UploadedFile(FileValidationPipe) file: Express.Multer.File,
    @Body() body: UploadFileDto,
  ) {
    if (!file) {
      return { error: 'No file provided' };
    }
    const path = await this.filesService.saveFile(file);
    return {
      message: 'File uploaded successfully',
      path,
      metadata: body,
    };
  }
}
