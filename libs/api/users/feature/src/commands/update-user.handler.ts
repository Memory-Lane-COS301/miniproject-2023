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

    if (!request.user.username)
      throw new Error('Missing required field username');

    const userDoc = await this.repository.findUser(request.user.userId);
    const userData = userDoc.data();
    if (!userData) throw new Error('User not found');

    const userSnapshot = await this.repository.findUserWithUsername(request.user.username);
    userSnapshot.forEach(doc => {
        const data = doc.data(); 
        if (doc.id !== request.user.userId && data.username === request.user.username)  
          throw new Error('Username already exists');
    });
    

    const user = this.publisher.mergeObjectContext(User.fromData(userData));
    user.updateUser(request.user);
    user.commit();

    const response: IUpdateUserResponse = { user };
    return response;
  }
}
