import { IUser } from '../interfaces';

export class IncrementUserMemoryCountCommand {
  constructor(public readonly request: IUser) {}
}
