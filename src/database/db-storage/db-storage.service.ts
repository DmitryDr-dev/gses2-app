import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class DbStorageService {
  private readonly logger = new Logger(DbStorageService.name);
  private localDbFolder: string;

  constructor() {
    this.localDbFolder = path.join(__dirname, '../db');
  }

  async doesDbFileExist(fileName: string) {
    const localDbFile = path.join(`${this.localDbFolder}/${fileName}.db.json`);
    try {
      await fs.readFile(localDbFile, 'utf8');
      return true;
    } catch (error) {
      this.logger.error('Error occurred while reading file:', error.message);
      return false;
    }
  }

  async writeDbFile(fileName: string, content = {}) {
    const localDbFile = path.join(`${this.localDbFolder}/${fileName}.db.json`);

    try {
      await fs.mkdir(this.localDbFolder, { recursive: true });
      await fs.writeFile(localDbFile, JSON.stringify(content, null, 2));
      return content;
    } catch (error) {
      this.logger.error('Error occurred while updating file:', error.message);
      return null;
    }
  }

  async readFile(fileName: string) {
    const localDbFile = path.join(`${this.localDbFolder}/${fileName}.db.json`);
    try {
      const content = await fs.readFile(localDbFile, 'utf8');
      const data = JSON.parse(content);
      return data;
    } catch (error) {
      this.logger.error('Error occurred while reading file:', error.message);
      return null;
    }
  }
}
