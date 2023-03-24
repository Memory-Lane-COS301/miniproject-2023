import { Timestamp } from 'firebase-admin/firestore';

export interface IUser {
  id: string;
  email: string | null | undefined;
  //displayName?: string | null | undefined;
  username: string| null | undefined;
  photoURL: string | null | undefined;
 // phoneNumber?: string | null | undefined;
  //customClaims?: { [key: string]: any } | null | undefined;
  loginStamp: Timestamp | null | undefined;
  created: Timestamp | null | undefined;
}
