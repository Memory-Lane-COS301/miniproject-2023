import { Timestamp } from 'firebase-admin/firestore';

export interface IComment {
  userId?: string | null | undefined;
  commentId?: string | null | undefined;
  username?: string | null | undefined;
  profileImgUrl?: string | null | undefined;
  text?: string | null | undefined;
  created?: Timestamp | null | undefined;
}
