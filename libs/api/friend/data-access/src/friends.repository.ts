import { IFriendRequest } from '@mp/api/friend/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FriendsRepository {
  async createFriendRequest(friendRequest: IFriendRequest) {
    return await admin.firestore().collection('friendRequests').doc().create(friendRequest);
  }
}
