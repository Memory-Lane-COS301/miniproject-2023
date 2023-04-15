import { IComment } from '../interfaces';

export class CreateCommentCommand {
  constructor(public readonly: IComment) {}
}
