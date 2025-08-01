import { readFileSync } from 'fs';
import { resolve } from 'path';

export class FileReader {
  static readFile(filePath: string, basePath?: string): string {
    const absolutePath = basePath ? resolve(basePath, filePath) : filePath;
    return readFileSync(absolutePath, 'utf-8');
  }
}
