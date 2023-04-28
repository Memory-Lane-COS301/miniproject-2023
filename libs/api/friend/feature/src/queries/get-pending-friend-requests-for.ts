import { ProfilesRepository } from '@mp/api/profiles/data-access';
import { FriendsRepository } from '@mp/api/friend/data-access';
import { GetPendingFriendRequestsForQuery, IGetPendingFriendResponse } from '@mp/api/friend/util';
import { IUser } from '@mp/api/users/util';
import { IProfile } from '@mp/api/profiles/util';
import { QueryHandler, EventPublisher, IQueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetPendingFriendRequestsForQuery)
export class GetPendingFriendRequestsForHandler implements IQueryHandler<GetPendingFriendRequestsForQuery, IGetPendingFriendResponse> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly profileRepository: ProfilesRepository,
    private readonly frinedRepository: FriendsRepository,
  ) {}

  async execute(query: GetPendingFriendRequestsForQuery) {
    const request = query.request;
    const friendIds = await this.frinedRepository.getPendingRequestsIdsFor(request.user.receiverId || ' ');

    const profiles: IProfile[] = [];

    for (let i = 0; i < friendIds.length; ++i) {
      const user: IUser = {
        userId: friendIds[i] || ' ',
      };

      const profileDetails = await this.profileRepository.getProfileDetails(user);
      const profileDetailsData = profileDetails.data();

      if (profileDetailsData)
        profileDetailsData.userId = friendIds[i];

      const profile: IProfile = {
        userId: friendIds[i] || ' ',
        user: profileDetailsData,
      };

      profiles.push(profile);
    }

    const response: IGetPendingFriendResponse = { profiles };
    return response;
  }
}
