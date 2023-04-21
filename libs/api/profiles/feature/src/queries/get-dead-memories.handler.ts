import { ProfilesRepository } from '@mp/api/profiles/data-access';
import { IGetProfileResponse, GetDeadMemoriesQuery, IProfile } from '@mp/api/profiles/util';
//import { IUser } from '@mp/api/users/util';
import { QueryHandler, EventPublisher, IQueryHandler } from '@nestjs/cqrs';
//import { Profile } from '../models';
import { IMemory } from '@mp/api/memories/util';

@QueryHandler(GetDeadMemoriesQuery)
export class GetDeadMemoriesHandler implements IQueryHandler<GetDeadMemoriesQuery, IGetProfileResponse> {
  constructor(private readonly publisher: EventPublisher, private readonly repository: ProfilesRepository) {}

  async execute(query: GetDeadMemoriesQuery) {
    const request = query.request;

    const profileMemories = await this.repository.getDeadMemories(request.user);

    const profile: IProfile = {
      userId: request.user.userId,
      memories: profileMemories,
      user: null,
    };

    const response: IGetProfileResponse = { profile };
    return response;
  }
}
