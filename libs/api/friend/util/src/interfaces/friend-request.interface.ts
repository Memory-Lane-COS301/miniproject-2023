import { Timestamp } from "firebase-admin/firestore";
import { FriendRequestStatus } from "../enums";

export interface IFriendRequest{ 
    senderId:string;
    receiverId:string; 
    status:FriendRequestStatus;
    lastUpdated?:Timestamp;
    created?:Timestamp; 
}