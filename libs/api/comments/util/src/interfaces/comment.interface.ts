import { Timestamp } from 'firebase-admin/firestore';

export interface IComment {
  userId: string;
  commentId: string;
  username?: string | null | undefined;
  profileImgUrl?: string | null | undefined;
  text?: string | null | undefined;
  created?: Timestamp | null | undefined;
}
