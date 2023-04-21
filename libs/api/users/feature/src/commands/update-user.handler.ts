import { UsersRepository } from '@mp/api/users/data-access';
import { UpdateUserCommand, IUpdateUserResponse } from '@mp/api/users/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../models';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand, IUpdateUserResponse> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: UsersRepository
  ) {}

  async execute(command: UpdateUserCommand) {
    console.log(`${UpdateUserCommand.name}`);

    const request = command.request;

    if (!request.user.userId)
      throw new Error('Missing required field userId');

    const userDoc = await this.repository.findUser(request.user.userId);
    const userData = userDoc.data();
    if (!userData) throw new Error('User not found');

    const user = this.publisher.mergeObjectContext(User.fromData(userData));
    user.updateUser(request.user);
    user.commit();

    const response: IUpdateUserResponse = { user };
    return response;
  }
}
