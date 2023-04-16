import { MemoriesModule as MemoriesDataAccessModule } from '@mp/api/memories/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateMemoryHandler, CreateCommentHandler, UpdatedCommentHandler } from './commands';
import { GetCommentsHandler } from './queries';
import { MemoryCreatedHandler, CommentCreatedHandler, CommentUpdatedHandler } from './events';
import { MemoriesSagas } from './memories.sagas';
import { MemoriesService } from './memories.service';

export const CommandHandlers = [CreateMemoryHandler, CreateCommentHandler, UpdatedCommentHandler];
export const QueryHandlers = [GetCommentsHandler];
export const EventHandlers = [MemoryCreatedHandler, CommentCreatedHandler, CommentUpdatedHandler];

@Module({
  imports: [CqrsModule, MemoriesDataAccessModule],
  providers: [MemoriesService, ...CommandHandlers, ...QueryHandlers, ...EventHandlers, MemoriesSagas],
  exports: [MemoriesService],
})
export class MemoriesModule {}
