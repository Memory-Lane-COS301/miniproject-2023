import { ProfilesModule as ProfilesDataAccessModule } from '@mp/api/profiles/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CreateProfileHandler,
  UpdateAccountDetailsHandler,
  UpdateAddressDetailsHandler,
  UpdateContactDetailsHandler,
  UpdateOccupationDetailsHandler,
  UpdatePersonalDetailsHandler,
  UpdateProfileStatusHandler,
} from './commands';
import {
  AccountDetailsUpdatedHandler,
  AddressDetailsUpdatedHandler,
  ContactDetailsUpdatedHandler,
  OccupationDetailsUpdatedHandler,
  PersonalDetailsUpdatedHandler,
  ProfileCreatedHandler,
  ProfileStatusUpdatedHandler,
} from './events';

import { GetProfileHandler, GetDeadMemoriesHandler } from './queries';

import { ProfilesSagas } from './profiles.sagas';
import { ProfilesService } from './profiles.service';
export const CommandHandlers = [
  CreateProfileHandler,
  UpdateContactDetailsHandler,
  UpdateAddressDetailsHandler,
  UpdatePersonalDetailsHandler,
  UpdateOccupationDetailsHandler,
  UpdateAccountDetailsHandler,
  UpdateProfileStatusHandler,
];
export const EventHandlers = [
  ProfileCreatedHandler,
  ContactDetailsUpdatedHandler,
  AddressDetailsUpdatedHandler,
  PersonalDetailsUpdatedHandler,
  OccupationDetailsUpdatedHandler,
  AccountDetailsUpdatedHandler,
  ProfileStatusUpdatedHandler,
];
export const QueryHandlers = [GetProfileHandler, GetDeadMemoriesHandler];

@Module({
  imports: [CqrsModule, ProfilesDataAccessModule],
  providers: [ProfilesService, ...CommandHandlers, ...EventHandlers, ...QueryHandlers, ProfilesSagas],
  exports: [ProfilesService],
})
export class ProfilesModule {}
