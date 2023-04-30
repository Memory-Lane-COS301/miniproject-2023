import { UsersRepository } from '@mp/api/users/data-access';
import { UserUpdatedEvent } from '@mp/api/users/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
  constructor(private readonly repository: UsersRepository) {}

  async handle(event: UserUpdatedEvent) {
    console.log(`${UserUpdatedEvent.name}`);
    await this.repository.updateUser(event.user);
  }
}
