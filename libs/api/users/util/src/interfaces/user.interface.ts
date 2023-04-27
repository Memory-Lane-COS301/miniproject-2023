import { Timestamp } from 'firebase-admin/firestore';

export interface IUser {
  userId: string;
  name?: string | null | undefined;
  surname?: string | null | undefined;
  username?: string | null | undefined;
  email?: string | null | undefined;
  profileImgUrl?: string | null | undefined;
  bio?: string | null | undefined;
  friendCount?: number | null | undefined;
  memoryCount?: number | null | undefined;
  accountTime?: number | null | undefined;
  lastOnline?: Timestamp | null | undefined;
  online?: boolean | null | undefined;
  created?: Timestamp | null | undefined;
  deathTime?: Timestamp | null | undefined;
}
