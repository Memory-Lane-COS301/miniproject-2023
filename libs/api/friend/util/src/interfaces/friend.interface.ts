import { Timestamp } from "firebase-admin/firestore";

export interface IFriend { 
    userId1: string;
    userId2: string;
    created: Timestamp;
}