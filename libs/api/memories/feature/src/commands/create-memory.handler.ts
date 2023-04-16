import { MemoryCreatedEvent, IMemory, CreateMemoryCommand } from '@mp/api/memories/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Memory } from '../models';
import { getAuth, User, Auth } from 'firebase/auth';
import { Timestamp } from 'firebase-admin/firestore';

const auth: Auth = getAuth();
const user: User | null = auth.currentUser;
const memoryInitialDuration: number = 24 * 60 * 60; //memory lasts for 24 hours

@CommandHandler(CreateMemoryCommand)
export class CreateMemoryHandler implements ICommandHandler<CreateMemoryCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: CreateMemoryCommand) {
    console.log(`${CreateMemoryHandler.name}`);

    if (user) {
      const request = command.request;
      const userId = request.memory.userId;
      const username = user.displayName;
      const title = request.memory.title;
      const description = request.memory.description;
      const imgUrl = request.memory.imgUrl;
      const profileImgUrl = user.photoURL;
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
    }
  }
}
