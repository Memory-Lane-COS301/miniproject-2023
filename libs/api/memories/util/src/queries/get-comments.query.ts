import { IGetCommentsRequest } from '../requests';

export class GetCommentsQuery {
  constructor(public readonly request: IGetCommentsRequest) {}
}
