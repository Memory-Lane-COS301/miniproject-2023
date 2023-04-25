import { Timestamp } from 'firebase-admin/firestore';
import { FriendRequestStatus } from '../enums';

export interface IFriendRequest {
  senderId: string;
  receiverId?: string;
  receiverUsername?: string | null | undefined;
  status?: FriendRequestStatus | null | undefined;
  lastUpdated?: Timestamp | null | undefined;
  created?: Timestamp | null | undefined;
}

export interface IFriend {
  userId1?: string;
  userId2?: string;
  created?: Timestamp;
}
