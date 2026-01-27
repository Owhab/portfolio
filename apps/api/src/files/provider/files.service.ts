import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  private readonly uploadPath = join(__dirname, '..', '..', 'uploads');

  async saveFile(file: Express.Multer.File): Promise<string> {
    // Ensure uploads folder exists
    await fs.mkdir(this.uploadPath, { recursive: true });

    const filePath = join(this.uploadPath, file.originalname);
    await fs.writeFile(filePath, file.buffer);
    return filePath;
  }

  // Optional: delete or fetch files
  async deleteFile(fileName: string) {
    const filePath = join(this.uploadPath, fileName);
    await fs.unlink(filePath);
  }
}
