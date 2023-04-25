import { ProfilesRepository } from '@mp/api/profiles/data-access';
import { IGetProfileResponse, GetProfileQuery, IProfile } from '@mp/api/profiles/util';
import { QueryHandler, EventPublisher, IQueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetProfileQuery)
export class GetProfileHandler implements IQueryHandler<GetProfileQuery, IGetProfileResponse> {
  constructor(private readonly publisher: EventPublisher, private readonly repository: ProfilesRepository) {}

  async execute(query: GetProfileQuery) {
    const request = query.request;

    const profileDetails = await this.repository.getProfileDetails(request.user);
    const profileDetailsData = profileDetails.data();

    const profileMemories = await this.repository.getProfileMemories(request.user);

    const profile: IProfile = {
      userId: request.user.userId,
      memories: profileMemories,
      user: profileDetailsData,
    };

    const response: IGetProfileResponse = { profile };
    return response;
  }
}
