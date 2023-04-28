import { UsersRepository } from '@mp/api/users/data-access';
import { IGetUserResponse, GetUserQuery, IGetUserRequest } from '@mp/api/users/util';
import { QueryHandler, EventPublisher, IQueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetUserQuery)
export class GetUserHandler
  implements IQueryHandler<GetUserQuery, IGetUserResponse>
{
  constructor(private readonly publisher: EventPublisher, private readonly repository: UsersRepository) {}

  async execute(query: GetUserQuery) {
    console.log(`${GetUserHandler.name}`);
    
    const request = query.request as IGetUserRequest;
    const userId = request.user.userId;
    console.debug(request);
    if (!userId) 
        throw new Error('Invalid Query: Missing username');
    try {
      const userDoc = (await this.repository.findUserById(userId));
      const userData = userDoc.data()
      if (!userData)
        throw new Error('User not found');
      const response: IGetUserResponse = { user: userData };
      return response;
    } 
    catch (findUserWithUsernameError) {
      throw new Error(`Could not retrieve user. Info: ${findUserWithUsernameError}`);
    }
  }
}
