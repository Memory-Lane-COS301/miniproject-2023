import { Timestamp } from "firebase-admin/firestore";
import { FriendRequestStatus } from "../enums";

export interface IFriendRequest{ 
    senderId?: string | null | undefined;
    receiverId?: string | null | undefined;
    receiverUsername?: string | null | undefined;
    status?: FriendRequestStatus | null | undefined;
    lastUpdated?: Timestamp | null | undefined;
    created?: Timestamp | null | undefined;
}