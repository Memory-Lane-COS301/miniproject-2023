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
    const username = request.user.username;
    console.debug(request);
    if (!username) 
        throw new Error('Invalid Query: Missing username');
    try {
      const userSnapShot = (await this.repository.findUserWithUsername(username));
      if (userSnapShot.empty)
        throw new Error('User not found');
      const user = userSnapShot.docs[0].data();
      const response: IGetUserResponse = { user: user };
      return response;
    } 
    catch (findUserWithUsernameError) {
      throw new Error(`Could not retrieve user. Info: ${findUserWithUsernameError}`);
    }
  }
}
