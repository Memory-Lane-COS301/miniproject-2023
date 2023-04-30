import { UsersRepository } from '@mp/api/users/data-access';
import { UserCreatedEvent } from '@mp/api/users/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(private readonly repository: UsersRepository) {}

  async handle(event: UserCreatedEvent) {
    console.log(`${UserCreatedHandler.name}`);
    const now = Timestamp.now();
    event.user.profileImgUrl = 'https://www.gravatar.com/avatar/3b3be63a4c2a49b013787725dfce802?d=identicon';
    event.user.bio = '';
    event.user.friendCount = 0;
    event.user.memoryCount = 0;
    event.user.accountTime = 24 * 60 * 60;
    event.user.lastOnline = Timestamp.now();
    event.user.online = true;
    event.user.created = now;
    event.user.deathTime = new Timestamp(now.seconds + 24 * 60 * 60, now.nanoseconds);

    await this.repository.createUser(event.user)
  }
}
