import { IMemory, CreateMemoryCommand, ICreateMemoryResponse } from '@mp/api/memories/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Memory } from '../models';
import { Timestamp } from 'firebase-admin/firestore';
import { UsersRepository } from '@mp/api/users/data-access'

@CommandHandler(CreateMemoryCommand)
export class CreateMemoryHandler implements ICommandHandler<CreateMemoryCommand, ICreateMemoryResponse> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: CreateMemoryCommand) {
    console.log(`${CreateMemoryHandler.name}`);

    const request = command.request;
    const userId = request.memory.userId;
    const memoryInitialDuration: number = 24 * 60 * 60; // memory lasts for 24 hours

    if (!request.memory.userId || !request.memory.title || !request.memory.description)
      throw new Error('Missing required fields');

    const usersRepository = new UsersRepository();
    const userDoc = await usersRepository.findUser(userId || " ");
    const userData = userDoc.data();

    if(!userData)
      throw new Error('User not found');

    const now = Timestamp.now();

    const data: IMemory = {
      userId: userData.userId,
      username: userData.username,
      title: request.memory.title,
      description: request.memory.description,
      imgUrl: request.memory.imgUrl,
      profileImgUrl: userData.profileImgUrl,
      created: now,
      commentsCount: 0,
      remainingTime: memoryInitialDuration,
      alive: true,
      deathTime: new Timestamp(now.seconds + 12 * 60 * 60, now.nanoseconds)
    };

    const memory = this.publisher.mergeObjectContext(Memory.fromData(data));
    memory.create();
    memory.commit();

    delete data.userId;
    return { memory : data };
  }
}