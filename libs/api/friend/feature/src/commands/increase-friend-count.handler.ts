import { UsersRepository } from '@mp/api/users/data-access';
import { ICreateFriendResponse, IncreaseFriendCountCommand, IFriendRequest, Status } from '@mp/api/friend/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { FriendRequest } from '../models';

@CommandHandler(IncreaseFriendCountCommand)
export class IncreaseFriendCountHandler implements ICommandHandler<IncreaseFriendCountCommand, ICreateFriendResponse> {
  constructor(private readonly publisher: EventPublisher, private readonly userRepository: UsersRepository) {}

  async execute(command: IncreaseFriendCountCommand) {
    console.log(`${IncreaseFriendCountCommand.name}`);

    const request = command.request;

    if (!request.senderId || !request.receiverId) throw new Error('Missing required fields');

    const userDoc = await this.userRepository.findUser(request.senderId);

    if (!userDoc.data()) throw new Error('User not found');

    const friendData: IFriendRequest = {
      senderId: request.senderId,
      receiverId: request.receiverId,
    };

    const friendRequest = this.publisher.mergeObjectContext(FriendRequest.fromData(friendData));

    friendRequest.increaseFriendCount();
    friendRequest.commit();

    return { status: Status.SUCCESS };
  }
}
