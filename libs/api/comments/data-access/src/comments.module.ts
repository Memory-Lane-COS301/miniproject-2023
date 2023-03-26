import { Module } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';

@Module({
  providers: [CommentsRepository],
  exports: [CommentsRepository],
})
export class CommentModule {}
