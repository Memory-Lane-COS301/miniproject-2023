import { ProfilesRepository } from '@mp/api/profiles/data-access';
import { FriendsRepository } from '@mp/api/friend/data-access';
import { IGetFriendsResponse, GetFriendsQuery } from '@mp/api/friend/util';
import { IUser } from '@mp/api/users/util';
import { IProfile } from '@mp/api/profiles/util';
import { QueryHandler, EventPublisher, IQueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetFriendsQuery)
export class GetFriendsHandler implements IQueryHandler<GetFriendsQuery, IGetFriendsResponse> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly profileRepository: ProfilesRepository,
    private readonly frinedRepository: FriendsRepository,
  ) {}

  async execute(query: GetFriendsQuery) {
    const request = query.request;

    const friendIds = await this.frinedRepository.getAllFriendIds(request.user.senderId);

    let profiles: IProfile[] = [];

    for (let i = 0; i < friendIds.length; ++i) {
      const user: IUser = {
        userId: friendIds[i] || ' ',
      };

      const profileDetails = await this.profileRepository.getProfileDetails(user);
      const profileDetailsData = profileDetails.data();

      const profileMemories = await this.profileRepository.getProfileMemories(user);

      const profile: IProfile = {
        userId: friendIds[i] || ' ',
        memories: profileMemories,
        user: profileDetailsData,
      };

      profiles.push(profile);
    }

    const response: IGetFriendsResponse = { profiles };
    return response;
  }
}
