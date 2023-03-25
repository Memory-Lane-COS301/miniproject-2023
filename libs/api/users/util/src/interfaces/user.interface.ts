import { Timestamp } from 'firebase-admin/firestore';

export interface IUser {
  id: string;
  email: string | null | undefined;
  username: string| null | undefined;
  photoURL: string | null | undefined;
  loginStamp: Timestamp | null | undefined;
  created: Timestamp | null | undefined;
}
