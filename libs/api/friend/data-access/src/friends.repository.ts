import { IFriendRequest, IFriend } from '@mp/api/friend/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

@Injectable()
export class FriendsRepository {
  async createFriendRequest(friendRequest: IFriendRequest) {
    return await admin.firestore().collection('friendRequests').doc().create(friendRequest);
  }

  async getCurrentFriend(userId1: string, userId2: string) {
    return await admin
      .firestore()
      .collection('friends')
      .where('userId1', '==', userId1)
      .where('userId2', '==', userId2)
      .get();
  }

  async deleteFriendRequest(friendRequestId: string) {
    return await admin.firestore().collection('friendRequests').doc(friendRequestId).delete();
  }

  async getPendingFriendIds(senderId: string) {
    const friendsRef = await admin
      .firestore()
      .collection('friendRequests')
      .where('senderId', '==', senderId)
      .where('status', '==', 'pending')
      .get();

    const friendDocs = friendsRef.docs;

    const friendIds = friendDocs.map((doc) => {
      const friendData = doc.data() as IFriendRequest;
      return friendData.receiverId;
    });

    return friendIds;
  }

  async getCurrentFriendRequest(senderId: string, receiverId: string) {
    return await admin
      .firestore()
      .collection('friendRequests')
      .where('receiverId', '==', receiverId)
      .where('senderId', '==', senderId)
      .get();
  }

  async updateFriendRequestStatusAccepted(friendRequestsId: string) {
    return await admin.firestore().collection('friendRequests').doc(friendRequestsId).update({
      status: 'accepted',
      lastUpdated: Timestamp.now(),
    });
  }

  async updateFriendRequestStatusRejected(friendRequestsId: string) {
    return await admin.firestore().collection('friendRequests').doc(friendRequestsId).update({
      status: 'rejected',
      lastUpdated: Timestamp.now(),
    });
  }

  async getAllFriends(userId1: string) {
    return await admin.firestore().collection('friends').where('userId1', '==', userId1).get();
  }

  async getAllFriendIds(userId1: string) {
    const db = admin.firestore();

    const friendsRef = db.collection('friends');
    const [querySnapshot1, querySnapshot2] = await Promise.all([
      friendsRef.where('userId1', '==', userId1).get(),
      friendsRef.where('userId2', '==', userId1).get(),
    ]);

    const friendDocs = [...querySnapshot1.docs, ...querySnapshot2.docs];

    const friendIds = friendDocs.map((doc) => {
      const friendData = doc.data() as IFriend;
      return friendData.userId1 === userId1 ? friendData.userId2 : friendData.userId1;
    });

    return friendIds;
  }

  async getCurrentFriendStatus(senderId: string, receiverId: string) {
    return await admin
      .firestore()
      .collection('friendRequests')
      .where('senderId', '==', senderId)
      .where('receiverId', '==', receiverId)
      .get();
  }

  async createFriend(friend: IFriend) {
    return await admin.firestore().collection('friends').doc().create(friend);
  }

  async deleteFriend(friendId: string) {
    return await admin.firestore().collection('friends').doc(friendId).delete();
  }
}
