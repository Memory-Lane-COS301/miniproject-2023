import { IMemory, CreateMemoryCommand } from '@mp/api/memories/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Memory } from '../models';
import { getAuth } from 'firebase-admin/auth';
import { Timestamp } from 'firebase-admin/firestore';
import { IUser } from '@mp/api/users/util';

@CommandHandler(CreateMemoryCommand)
export class CreateMemoryHandler implements ICommandHandler<CreateMemoryCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: CreateMemoryCommand) {
  
    console.log(`${CreateMemoryHandler.name}`);
    const request = command.request;
    const userId = request.memory.userId;
    const memoryInitialDuration: number = 24 * 60 * 60; //memory lasts for 24 hours
    console.debug('request: ',request);
    getAuth()
      .getUser(userId!)
      .then(( userRecord) => {
        console.debug(userRecord);
        const user = userRecord.toJSON() as IUser;
        const username = user.username;
        const title = request.memory.title;
        const description = request.memory.description;
        const imgUrl = request.memory.imgUrl;
        const profileImgUrl = user.profileImgUrl;
        const created = Timestamp.fromDate(new Date());
        const commentsCount = 0;
        const remainingTime = memoryInitialDuration;
        const alive = true;
  
        const data: IMemory = {
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
        const memory = this.publisher.mergeObjectContext(Memory.fromData(data));
        memory.create();
        memory.commit();
      },(error)=>{
          //TODO implement
            //handle error for invalid uid
          console.debug('Error fetching user data:', error);
      });
  }
}