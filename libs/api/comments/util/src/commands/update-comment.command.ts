import { IComment } from '../interfaces';

export class UpdateCommentCommand {
  constructor(public readonly: IComment) {}
}
