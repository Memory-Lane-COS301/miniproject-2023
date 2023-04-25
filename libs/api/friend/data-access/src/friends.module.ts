import { Module } from '@nestjs/common';
import { FriendsRepository } from './friends.repository';
import { ProfilesRepository } from '@mp/api/profiles/data-access';

@Module({
  providers: [FriendsRepository, ProfilesRepository],
  exports: [FriendsRepository, ProfilesRepository],
})
export class FriendsModule {}
