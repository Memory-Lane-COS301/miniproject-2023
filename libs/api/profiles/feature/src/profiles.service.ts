import {
  IUpdateAccountDetailsRequest,
  IUpdateAccountDetailsResponse,
  IUpdateAddressDetailsRequest,
  IUpdateAddressDetailsResponse,
  IUpdateContactDetailsRequest,
  IUpdateContactDetailsResponse,
  IUpdateOccupationDetailsRequest,
  IUpdateOccupationDetailsResponse,
  IUpdatePersonalDetailsRequest,
  IUpdatePersonalDetailsResponse,
  UpdateAccountDetailsCommand,
  UpdateAddressDetailsCommand,
  UpdateContactDetailsCommand,
  UpdateOccupationDetailsCommand,
  UpdatePersonalDetailsCommand,
  IGetProfileRequest,
  IGetProfileResponse,
  GetProfileQuery,
  GetDeadMemoriesQuery,
} from '@mp/api/profiles/util';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class ProfilesService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  async updateAccountDetails(request: IUpdateAccountDetailsRequest): Promise<IUpdateAccountDetailsResponse> {
    return await this.commandBus.execute<UpdateAccountDetailsCommand, IUpdateAccountDetailsResponse>(
      new UpdateAccountDetailsCommand(request),
    );
  }

  async updateAddressDetails(request: IUpdateAddressDetailsRequest): Promise<IUpdateAddressDetailsResponse> {
    return await this.commandBus.execute<UpdateAddressDetailsCommand, IUpdateAddressDetailsResponse>(
      new UpdateAddressDetailsCommand(request),
    );
  }

  async updateContactDetails(request: IUpdateContactDetailsRequest): Promise<IUpdateContactDetailsResponse> {
    return await this.commandBus.execute<UpdateContactDetailsCommand, IUpdateContactDetailsResponse>(
      new UpdateContactDetailsCommand(request),
    );
  }

  async updatePersonalDetails(request: IUpdatePersonalDetailsRequest): Promise<IUpdatePersonalDetailsResponse> {
    return await this.commandBus.execute<UpdatePersonalDetailsCommand, IUpdatePersonalDetailsResponse>(
      new UpdatePersonalDetailsCommand(request),
    );
  }

  async updateOccupationDetails(request: IUpdateOccupationDetailsRequest): Promise<IUpdateOccupationDetailsResponse> {
    return await this.commandBus.execute<UpdateOccupationDetailsCommand, IUpdateOccupationDetailsResponse>(
      new UpdateOccupationDetailsCommand(request),
    );
  }

  async getProfileRequest(request: IGetProfileRequest): Promise<IGetProfileResponse> {
    return await this.queryBus.execute<GetProfileQuery, IGetProfileResponse>(new GetProfileQuery(request));
  }

  async getDeadMemoriesRequest(request: IGetProfileRequest): Promise<IGetProfileResponse> {
    return await this.queryBus.execute<GetDeadMemoriesQuery, IGetProfileResponse>(new GetDeadMemoriesQuery(request));
  }
}
