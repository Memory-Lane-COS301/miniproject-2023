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
    const user = (await usersRepository.findUser(userId!)).data()!;
    
    console.debug('user: ',user);
    const username = user.username;
    const title = request.memory.title;
    const description = request.memory.description;
    const imgUrl = request.memory.imgUrl;
    const profileImgUrl = user.profileImgUrl;
    const created = Timestamp.fromDate(new Date());
    const commentsCount = 0;
    const remainingTime = memoryInitialDuration;
    const alive = true;

    const memory: IMemory = {
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
    const memoriesRepository:MemoriesRepository = new MemoriesRepository();
    try{
      const writeResults =  await memoriesRepository.createMemory(memory)
      if(writeResults.writeTime){
        const memoryEventPublisher = this.publisher.mergeObjectContext(Memory.fromData(memory));
        memoryEventPublisher.create();
        memoryEventPublisher.commit();
        const iCreateMemoryResponse = {
          ICreateMemoryResponse:memory
        }
        return iCreateMemoryResponse;
      }
    }
    catch(writeError){
      const error = {
        error: `writing memory to peristant storage failed. Info ${writeError}`
      };
      return error;
    }
  }
}