import { ICreateCommentRequest } from '../requests';

export class CreateCommentCommand {
  constructor(public readonly request: ICreateCommentRequest) {
    console.log(request);
  }
}
