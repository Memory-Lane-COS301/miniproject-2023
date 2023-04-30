import { MemoriesRepository } from '@mp/api/memories/data-access';
import { IGetCommentsResponse, GetCommentsQuery } from '@mp/api/memories/util';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetCommentsQuery)
export class GetCommentsHandler
  implements IQueryHandler<GetCommentsQuery, IGetCommentsResponse>
{
  constructor(private readonly repository: MemoriesRepository) {}

  async execute(query: GetCommentsQuery) {
    console.log(`${GetCommentsHandler.name}`);

    const request = query.request;

    if (!request.memory.memoryId)
      throw new Error('Memory not found');

    const querySnapshot = await this.repository.getComments(request.memory.memoryId);
    const response: IGetCommentsResponse = { comments: querySnapshot.docs.map(doc => doc.data()) };
    return response;
  }
}
