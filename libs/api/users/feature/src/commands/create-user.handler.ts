import { CreateUserCommand, IUser } from '@mp/api/users/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../models';
import { UsersRepository } from '@mp/api/users/data-access';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private publisher: EventPublisher,
    private userRepository: UsersRepository
  ) {}

  async execute(command: CreateUserCommand) {
    console.log(`${CreateUserHandler.name}`);

    let username = '';
    let i = 0;

    while (i++ < 10) {
      username = generateRandomUsername();
      const snapshot = await this.userRepository.findUserWithUsername(username);

      if (snapshot.empty)
        break;
    }

    const request = command.request;
    const data: IUser = {
      userId: request.auth.id,
      name:"",
      surname:"",
      username: username,
      email: request.auth.email,
      profileImgUrl: request.auth.photoURL,
      created: request.auth.created,
    };
    const user = this.publisher.mergeObjectContext(User.fromData(data));

    user.create();
    user.commit();
  }
}

function generateRandomUsername(): string {
  const prefix = "user";
  const randomString = Math.random().toString(36).substring(2, 7);
  return `${prefix}-${randomString}`;
}
