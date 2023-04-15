import { Module } from '@nestjs/common';
import { MemoriesRepository } from './memories.repository';

@Module({
  providers: [MemoriesRepository],
  exports: [MemoriesRepository],
})
export class MemoriesModule {}
