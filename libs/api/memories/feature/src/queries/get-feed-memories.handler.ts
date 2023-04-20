import { MemoriesRepository } from '@mp/api/memories/data-access';
import { UsersRepository } from '@mp/api/users/data-access';
import { IGetFeedMemoriesResponse, GetFeedMemoriesQuery } from '@mp/api/memories/util';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetFeedMemoriesQuery)
export class GetFeedMemoriesHandler
  implements IQueryHandler<GetFeedMemoriesQuery, IGetFeedMemoriesResponse>
{
  constructor(
    private readonly memoriesRepository: MemoriesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(query: GetFeedMemoriesQuery) {
    console.log(`${GetFeedMemoriesHandler.name}`);

    const request = query.request;

    if (!request.user.userId)
      throw new Error('Missing required field userId');
    
    const userDoc = await this.usersRepository.findUser(request.user.userId);
    if (!userDoc.data())
      throw new Error('User not found');

    try {
      const memoriesSnapshot = await this.memoriesRepository.getFeedMemories(request.user.userId);
      return { memories: memoriesSnapshot.docs.map(doc => doc.data()) };
    } catch (error) {
      if (error instanceof Error)
        return  { memories: [] };
      
        throw error
   }
  }
}
