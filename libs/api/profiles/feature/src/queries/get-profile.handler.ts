import { ProfilesRepository } from '@mp/api/profiles/data-access';
import { IGetProfileResponse, GetProfileQuery, IProfile } from '@mp/api/profiles/util';
//import { IUser } from '@mp/api/users/util';
import { QueryHandler, EventPublisher, IQueryHandler } from '@nestjs/cqrs';
//import { Profile } from '../models';
import { IMemory } from '@mp/api/memories/util';

@QueryHandler(GetProfileQuery)
export class GetProfileHandler implements IQueryHandler<GetProfileQuery, IGetProfileResponse> {
  constructor(private readonly publisher: EventPublisher, private readonly repository: ProfilesRepository) {}

  async execute(query: GetProfileQuery) {
    const request = query.request;

    const profileDetails = await this.repository.getProfileDetails(request.user);
    const profileDetailsData = profileDetails.data();

    const profileMemories = await this.repository.getProfileMemories(request.user);
    const CurrentMemories: IMemory[] = [];
  
    const profile: IProfile = {
      userId: request.user.userId,
      memories: profileMemories,
      user: profileDetailsData,
    };

    const response: IGetProfileResponse = { profile };
    return response;
  }
}
