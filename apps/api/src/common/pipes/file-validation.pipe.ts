import { Injectable, PipeTransform } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FileValidationPipe implements PipeTransform<Express.Multer.File> {
  transform(file: Express.Multer.File) {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf'];
    const ext = extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      throw new Error(
        `Invalid file type. Allowed types are: ${allowedExtensions.join(', ')}`,
      );
    }
    return file;
  }
}
