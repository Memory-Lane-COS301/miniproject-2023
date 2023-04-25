import { UsersRepository } from '@mp/api/users/data-access';
import { FriendsRepository } from '@mp/api/friend/data-access';
import { ICreateFriendResponse, CreateFriendCommand, IFriend, Status } from '@mp/api/friend/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Friend } from '../models';
import { Timestamp } from 'firebase-admin/firestore';

@CommandHandler(CreateFriendCommand)
export class CreateFriendHandler implements ICommandHandler<CreateFriendCommand, ICreateFriendResponse> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly userRepository: UsersRepository,
    private readonly friendsRepository: FriendsRepository,
  ) {}

  async execute(command: CreateFriendCommand) {
    console.log(`${CreateFriendCommand.name}`);

    const request = command.request;

    if (!request.friendRequest.senderId || !request.friendRequest.receiverId)
      throw new Error('Missing required fields');

    const userDoc = await this.userRepository.findUser(request.friendRequest.senderId);

    if (!userDoc.data()) throw new Error('User not found');

    //check if userId2 alreay friended userId1
    const possibleFriendSnapshot = await this.friendsRepository.getCurrentFriend(
      request.friendRequest.receiverId,
      request.friendRequest.senderId,
    );
    if (possibleFriendSnapshot.size == 0) {
      //check if userId1 alreay friended userId2
      const currentFriendSnapshot = await this.friendsRepository.getCurrentFriend(
        request.friendRequest.senderId,
        request.friendRequest.receiverId,
      );
      if (currentFriendSnapshot.size == 0) {
        const friendData: IFriend = {
          userId1: request.friendRequest.senderId,
          userId2: request.friendRequest.receiverId,
          created: Timestamp.now(),
        };

        const friendRequest = this.publisher.mergeObjectContext(Friend.fromData(friendData));

        friendRequest.create();
        friendRequest.commit();
      }
    }

    return { status: Status.SUCCESS };
  }
}
