import { Timestamp } from 'firebase-admin/firestore';
import { ProfileStatus } from '../enums';
import { IAccountDetails } from './account-details.interface';
import { IAddressDetails } from './address-details.interface';
import { IContactDetails } from './contact-details.interface';
import { IOccupationDetails } from './occupation-details.interface';
import { IPersonalDetails } from './personal-details.interface';
import { IUser } from '@mp/api/users/util';
import { IMemory } from '@mp/api/memories/util';

export interface IProfile {
  user?: IUser | null | undefined;
  memories?: IMemory[] | null | undefined;

  userId: string;
  accountDetails?: IAccountDetails | null | undefined;
  personalDetails?: IPersonalDetails | null | undefined;
  contactDetails?: IContactDetails | null | undefined;
  addressDetails?: IAddressDetails | null | undefined;
  occupationDetails?: IOccupationDetails | null | undefined;
  status?: ProfileStatus | null | undefined;
  created?: Timestamp | null | undefined;
}
