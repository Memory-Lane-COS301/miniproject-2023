import { GetUserCommand, IUser } from '@mp/api/users/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../models';
import { UsersRepository } from '@mp/api/users/data-access';

@CommandHandler(GetUserCommand)
export class GetUserHandler implements ICommandHandler<GetUserCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: GetUserCommand) {
    console.log(`${GetUserHandler.name}`);

    const request = command.request;
    const userId = request.user.userId;console.debug(request);
    const usersRepository = new UsersRepository();
    try {
        const userSnapshot = await usersRepository.findUser(userId);
        const userFromDb = userSnapshot.data();
        if(userFromDb){
            const data: IUser = userFromDb;
            const user = this.publisher.mergeObjectContext(User.fromData(data));
            user.create();
            user.commit();
            return userFromDb;
        }
        return {
            error: 'User not found'
        }
    } 
    catch (error) {
        return {
            error: `Failed to getUser. Infor: ${error}`
        }
    }
  }
}
