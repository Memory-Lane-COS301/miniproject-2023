import { ICreateMemoryRequest } from '../requests';

export class CreateMemoryCommand {
  constructor(public readonly request: ICreateMemoryRequest) {}
}
