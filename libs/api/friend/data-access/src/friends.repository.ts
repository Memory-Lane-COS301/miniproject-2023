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
