import { IGetProfileRequest } from '../requests';

export class GetProfileQuery {
  constructor(public readonly request: IGetProfileRequest) {}
}
