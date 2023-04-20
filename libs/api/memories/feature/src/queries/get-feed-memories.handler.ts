import { MemoriesRepository } from '@mp/api/memories/data-access';
import { UsersRepository } from '@mp/api/users/data-access';
import { IGetFeedMemoriesResponse, GetFeedMemoriesQuery } from '@mp/api/memories/util';
import { QueryHandler, EventPublisher, IQueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetFeedMemoriesQuery)
export class GetFeedMemoriesHandler
  implements IQueryHandler<GetFeedMemoriesQuery, IGetFeedMemoriesResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly memoriesRepository: MemoriesRepository,
    private readonly usersRepository: UsersRepository
  ) {}

  async execute(query: GetFeedMemoriesQuery) {
    console.log(`${GetFeedMemoriesHandler.name}`);

    const request = query.request;

    if (!request.user.userId) throw new Error('Missing required field userId');

    try {
      const comments = await this.memoriesRepository.(request.memory.memoryId);
      const response: IGetCommentsResponse = { comments: comments };
      return response;
    } catch (e) {
      throw new Error('Could not retrieve comments');
    }
  }
}
