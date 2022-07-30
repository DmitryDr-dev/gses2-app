import { Module } from '@nestjs/common';
import { DbStorageService } from './db-storage.service';

@Module({
  providers: [DbStorageService],
  exports: [DbStorageService],
})
export class DbStorageModule {}
