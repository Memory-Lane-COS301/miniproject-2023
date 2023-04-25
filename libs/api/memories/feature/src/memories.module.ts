import { MemoriesModule as MemoriesDataAccessModule } from '@mp/api/memories/data-access';
import { ProfilesModule as ProfilesDataAccessModule } from '@mp/api/profiles/data-access';
import { UsersModule as UsersDataAccessModule } from '@mp/api/users/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import {
  CreateMemoryHandler,
  CreateCommentHandler,
  UpdateCommentHandler,
  ReviveDeadMemoryCommandHandler,
  DeductAccountTimeHandler,
} from './commands';
import { GetCommentsHandler, GetFeedMemoriesHandler } from './queries';
import {
  MemoryCreatedHandler,
  CommentCreatedHandler,
  CommentUpdatedHandler,
  ReviveDeadMemoryEventHandler,
  DeductAccountTimeEventHandler,
} from './events';
import { MemoriesSagas } from './memories.sagas';
import { MemoriesService } from './memories.service';

export const CommandHandlers = [
  CreateMemoryHandler,
  CreateCommentHandler,
  UpdateCommentHandler,
  ReviveDeadMemoryCommandHandler,
  DeductAccountTimeHandler,
];
export const QueryHandlers = [GetCommentsHandler, GetFeedMemoriesHandler];
export const EventHandlers = [
  MemoryCreatedHandler,
  CommentCreatedHandler,
  CommentUpdatedHandler,
  ReviveDeadMemoryEventHandler,
  DeductAccountTimeEventHandler,
];

@Module({
  imports: [CqrsModule, MemoriesDataAccessModule, UsersDataAccessModule, ProfilesDataAccessModule],
  providers: [MemoriesService, ...CommandHandlers, ...QueryHandlers, ...EventHandlers, MemoriesSagas],
  exports: [MemoriesService],
})
export class MemoriesModule {}
