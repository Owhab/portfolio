import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { promises as fs } from 'fs';
import { randomUUID } from 'crypto';

@Injectable()
export class UploadService {
  private readonly uploadRoot = join(process.cwd(), 'uploads');

  async uploadImage(file: Express.Multer.File, folder: string) {
    const uploadDir = join(this.uploadRoot, folder);
    await fs.mkdir(uploadDir, { recursive: true });

    const ext = file.originalname.split('.').pop();
    const fileName = `${randomUUID()}.${ext}`;
    const fullPath = join(uploadDir, fileName);

    await fs.writeFile(fullPath, file.buffer);

    // return the relative path to the uploaded file
    return `/uploads/${folder}/${fileName}`;
  }
}
