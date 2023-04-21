import { Module } from '@nestjs/common';
import { FriendsRepository } from './friends.repository';

@Module({
  providers: [FriendsRepository],
  exports: [FriendsRepository],
})
export class FriendsModule {}
