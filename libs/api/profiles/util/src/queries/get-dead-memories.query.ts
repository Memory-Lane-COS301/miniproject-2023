import { IGetProfileRequest } from '../requests';

export class GetDeadMemoriesQuery {
  constructor(public readonly request: IGetProfileRequest) {}
}
