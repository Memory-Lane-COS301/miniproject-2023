import { UsersRepository } from '@mp/api/users/data-access';
import { FriendsRepository } from '@mp/api/friend/data-access';
import {
  ICreateFriendResponse,
  CreateFriendRequestCommand,
  FriendRequestStatus,
  IFriendRequest,
  Status,
} from '@mp/api/friend/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { FriendRequest } from '../models';
import { Timestamp } from 'firebase-admin/firestore';

@CommandHandler(CreateFriendRequestCommand)
export class CreateFriendRequestHandler implements ICommandHandler<CreateFriendRequestCommand, ICreateFriendResponse> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly userRepository: UsersRepository,
    private readonly friendsRepository: FriendsRepository,
  ) {}

  async execute(command: CreateFriendRequestCommand) {
    console.log(`${CreateFriendRequestCommand.name}`);

    const request = command.request;
    
    if (!request.friendRequest.senderId || !request.friendRequest.receiverUsername)
      throw new Error('Missing required fields');

    const userDoc = await this.userRepository.findUser(request.friendRequest.senderId);

    if (!userDoc.data()) throw new Error('User not found');

    const receiverSnapshot = await this.userRepository.findUserWithUsername(request.friendRequest.receiverUsername);

    if (receiverSnapshot.empty) throw new Error('Receiver not found');

    const receiverUserDoc = receiverSnapshot.docs[0];

    //check that friend request not already sent by other user
    const possibleFriendRequestsSnapshot = await this.friendsRepository.getCurrentFriendRequest(
      receiverUserDoc.id,
      request.friendRequest.senderId,
    );
    if (possibleFriendRequestsSnapshot.size == 0) {
      //check that the current user has not already sent a freind request
      const currentFriendRequestsSnapshot = await this.friendsRepository.getCurrentFriendRequest(
        request.friendRequest.senderId,
        receiverUserDoc.id,
      );
      if (currentFriendRequestsSnapshot.size == 0) {
        const friendData: IFriendRequest = {
          senderId: request.friendRequest.senderId,
          receiverId: receiverUserDoc.id,
          status: FriendRequestStatus.PENDING,
          lastUpdated: Timestamp.now(),
          created: Timestamp.now(),
        };

        const friendRequest = this.publisher.mergeObjectContext(FriendRequest.fromData(friendData));

        friendRequest.create();
        friendRequest.commit();
      }
    }

    return { status: Status.SUCCESS };
  }
}
