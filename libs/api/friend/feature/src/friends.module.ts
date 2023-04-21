import { FriendsModule as FriendsDataAccessModule } from '@mp/api/friend/data-access';
import { UsersModule as UsersDataAccessModule } from '@mp/api/users/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CreateFriendRequestHandler,
} from './commands';
import {
  FriendRequestCreatedHandler,
} from './events';
import { FriendsService } from './friends.service';
export const CommandHandlers = [
  CreateFriendRequestHandler
];
export const EventHandlers = [
  FriendRequestCreatedHandler
];

@Module({
  imports: [CqrsModule, FriendsDataAccessModule, UsersDataAccessModule],
  providers: [FriendsService, ...CommandHandlers, ...EventHandlers],
  exports: [FriendsService],
})
export class FriendsModule {}
