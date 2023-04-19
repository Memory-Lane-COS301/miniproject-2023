import { IMemory, CreateMemoryCommand, ICreateMemoryResponse } from '@mp/api/memories/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Memory } from '../models';
import { Timestamp } from 'firebase-admin/firestore';
import { UsersRepository } from '@mp/api/users/data-access'
import { MemoriesRepository } from '@mp/api/memories/data-access';

@CommandHandler(CreateMemoryCommand)
export class CreateMemoryHandler implements ICommandHandler<CreateMemoryCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: CreateMemoryCommand) {
  
    console.log(`${CreateMemoryHandler.name}`);
    const request = command.request;
    console.debug('request: ',request);
    const userId = request.memory.userId;
    const memoryInitialDuration: number = 24 * 60 * 60; //memory lasts for 24 hours
    const usersRepository = new UsersRepository();
    const userData = (await usersRepository.findUser(userId!)).data()!; // for profileImgUrl and username
    if(!userData)
      throw new Error('User not found');
    const username = userData.username;
    const title = request.memory.title;
    const description = request.memory.description;
    const imgUrl = request.memory.imgUrl;
    const profileImgUrl = userData.profileImgUrl;
    const created = Timestamp.fromDate(new Date());
    const commentsCount = 0;
    const remainingTime = memoryInitialDuration;
    const alive = true;

    const iMemory: IMemory = {
      userId: userId,
      username: username,
      title: title,
      description: description,
      imgUrl: imgUrl,
      profileImgUrl: profileImgUrl,
      created: created,
      commentsCount: commentsCount,
      remainingTime: remainingTime,
      alive: alive,
    };
    const memory = this.publisher.mergeObjectContext(Memory.fromData(iMemory));
    memory.create();
    memory.commit();
    return {memory : memory } as ICreateMemoryResponse;
  }
}