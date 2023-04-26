import { IUpdateMemoryTimeRequest } from '../requests';

export class UpdateMemoryTimeCommand {
  constructor(public readonly request: IUpdateMemoryTimeRequest) {}
}
