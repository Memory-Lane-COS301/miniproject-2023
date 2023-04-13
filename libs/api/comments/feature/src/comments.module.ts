import { CommentsModule as CommentDataAccessModule } from '@mp/api/comments/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCommentHandler } from './commands';
import { CommentCreatedHandler } from './events';
import { CommentsSagas } from './comments.sagas';
import { CommentsService } from './comments.service';

export const CommandHandlers = [CreateCommentHandler];
export const EventHandlers = [CommentCreatedHandler];

@Module({
  imports: [CqrsModule, CommentDataAccessModule],
  providers: [CommentsService, ...CommandHandlers, ...EventHandlers, CommentsSagas],
  exports: [CommentsService],
})
export class CommentsModule {}
