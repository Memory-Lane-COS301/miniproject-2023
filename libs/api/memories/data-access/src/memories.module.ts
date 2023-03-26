import { Module } from '@nestjs/common';
import { MemoryRepository } from './memories.repository';

@Module({
  providers: [MemoryRepository],
  exports: [MemoryRepository],
})
export class MemoryModule {}
