import { MemoriesRepository } from '@mp/api/memories/data-access';
import { UsersRepository } from '@mp/api/users/data-access';
import { CreateCommentCommand, IComment, ICreateCommentResponse } from '@mp/api/memories/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';
import { Comment } from '../models';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler implements ICommandHandler<CreateCommentCommand, ICreateCommentResponse> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly memoriesRepository: MemoriesRepository, 
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(command: CreateCommentCommand) {
    console.log(`${CreateCommentHandler.name}`);

    const request = command.request;

    if (!request.comment.userId || !request.comment.memoryId || !request.comment.text)
      throw new Error('Missing required fields');

    const userDoc = await this.usersRepository.findUser(request.comment.userId);
    const userData = userDoc.data();

    if (!userData)
      throw new Error('User not found');

    const memoryDoc = await this.memoriesRepository.findMemory(request.comment.memoryId);
    const memoryData = memoryDoc.data();

    if (!memoryData)
      throw new Error('Memory not found');

    const data: IComment = {
      userId: userData.userId,
      memoryId: memoryData?.memoryId,
      commentId: admin.firestore().collection('memories').doc().id, // need to find a better fix for this
      username: userData?.username,
      profileImgUrl: userData?.profileImgUrl,
      text: request.comment?.text,
      created: Timestamp.now(),
    }
    
    const comment = this.publisher.mergeObjectContext(Comment.fromData(data));
    
    comment.create();
    comment.commit();

    delete data.userId;
    const response: ICreateCommentResponse = { comment: data };
    return response;
  }
}
