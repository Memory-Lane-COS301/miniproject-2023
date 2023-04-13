import { Timestamp } from 'firebase-admin/firestore';
import { IComment } from '@mp/api/comments/util';

export interface IMemory {
  userId?: string | null | undefined;
  username?: string | null | undefined;
  title?: string | null | undefined;
  description?: string | null | undefined;
  imgUrl?: string | null | undefined;
  profileImgUrl?: string | null | undefined;
  created?: Timestamp | null | undefined;
  commentsCount?: number | null | undefined;
  remainingTime?: number | null | undefined;
  alive?: boolean | null | undefined;
  comments?: IComment[] | null | undefined;
}
