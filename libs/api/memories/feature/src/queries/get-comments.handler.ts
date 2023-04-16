import { MemoriesRepository } from '@mp/api/memories/data-access';
import { IGetCommentsResponse, GetCommentsQuery } from '@mp/api/memories/util';
import { QueryHandler, EventPublisher, IQueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetCommentsQuery)
export class GetCommentsHandler implements IQueryHandler<GetCommentsQuery, IGetCommentsResponse> {
  constructor(private readonly publisher: EventPublisher, private readonly repository: MemoriesRepository) {}

  async execute(query: GetCommentsQuery) {
    console.log(`${GetCommentsHandler.name}`);

    const request = query.request;

    delete request.memory.memoryId;
    if (!request.memory.memoryId) throw new Error('Memory not found');

    try {
      const comments = await this.repository.getComments(request.memory.memoryId);
      const response: IGetCommentsResponse = { comments: comments };
      return response;
    } catch (e) {
      throw new Error('Could not retrieve comments');
    }
  }
}
