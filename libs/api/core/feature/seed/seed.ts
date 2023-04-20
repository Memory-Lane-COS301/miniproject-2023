import * as admin from 'firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';
import { IMemory, IComment } from '@mp/api/memories/util';
import { IFriendRequest, FriendRequestStatus } from '@mp/api/friend/util';
import { IUser } from '@mp/api/users/util';

export class Seed {
  constructor() {
    console.log('Seeding the db');
  }

  run(): void {
    const name: string[] = [
      'Sam',
      'John',
      'Adam',
      'Joe',
      'Mike',
      'Thabang',
      'Themba',
      'Jade',
      'Vukani',
      'Thulani',
      'Andrew',
      'Mark',
      'Samson',
      'Angelica',
      'Delilah',
    ];
    
    const surname: string[] = [
      'Ndlovu',
      'Smith',
      'Johnson',
      'Michaelson',
      'Parker',
      'Adamson',
      'Tshabalala',
      'Mabuya',
      'Kakweza',
      'Mayors',
      'Mathers',
      'Moyo',
      'Tshela',
      'Mokoeana',
      'Ngwenya',
    ];

    const images: string[] = [
      '../images/preview16 (1).jpg',
      '../images/preview16.jpg',
      '../images/thumb16 (1).jpg',
      '../images/thumb16 (2).jpg',
      '../images/thumb16 (3).jpg',
      '../images/thumb16 (4).jpg',
      '../images/thumb16 (5).jpg',
      '../images/thumb16 (6).jpg',
      '../images/thumb16 (7).jpg',
      '../images/thumb16 (8).jpg',
      '../images/thumb16 (9).jpg',
      '../images/thumb16 (10).jpg',
      '../images/thumb16 (11).jpg',
      '../images/thumb16 (12).jpg',
      '../images/thumb16 (3).jpg',
      '../images/thumb16 (14).jpg',
      '../images/thumb16 (15).jpg',
    ];

    const emails: string[] = [
      'cigevot839@lieboe.com',
      'example.com',
      'asda@gmail.com',
      'asdscedrfs@g,mail.com',
      'easd@gmail.com',
      'lwqsidihn@gmail.com',
      'sawqa@gmail.com',
      'polkjnh@gmail.com',
      'hjn@gmail.com',
      'frygtuyh@gmail.com',
      'gbiqb ou@gmail.com',
      'wqnwo1uh2@gmail.com',
      'asd2v1yhi@gmail.com',
      'azdgj46128@gmail.com',
      'vt8hiu310@gmail.com',
      'nb21vjghu6821@gmail.com',
    ];

    const comment: IComment = {
      userId: '123456789',
      commentId: '987654321',
      username: 'a user',
      text: 'Generic text that should take a up a while bunch of space for no reason and now some keyboard mashing dtcfvgb hjlkmfjknjlmkfghjnkm,sdxrfctvgybhunjimk,ldrcftvgybhunjimkol,dcfvgbhnjmklcfgvbhnjmk,l.;dfcgv hbkm.dcftvgybhunjimko,lp.;[drcfgvtbhunjmk,lp.;dfc gvhbmkc gvkmfvgbhujnimo,l;.[/dcftvgybhujnkmpl.;[/',
    };

    for (let i = 0; i < 15; i++) {
      const count = Math.ceil(Math.random() * 4);
      const commentList: IComment[] = [];
      for (let k = 0; k < count; k++) {
        comment.commentId = Math.ceil(Math.random() * 100000) + '';
        commentList.push(comment);
      }
      
      const split = images[i].lastIndexOf('/');
      const remotepath = images[i].substring(split);
      admin
        .storage()
        .bucket('user' + i)
        .upload(images[i], { destination: remotepath, metadata: { contentType: 'image/jpeg' } });
      const link = admin
        .storage()
        .bucket('user' + i)
        .file(remotepath).cloudStorageURI.href;

      const mem: IMemory = {
        userId: 'user' + i,
        memoryId: 'memory' + (14 - i),
        username: name[i] +'_'+ surname[i],
        title: 'A memory posted by user' + i,
        description: 'Some fake data for seeding purposes',
        imgUrl: link,
        profileImgUrl: link,
        created: Timestamp.now(),
        commentsCount: count,
        remainingTime: Math.ceil(Math.random()),
        alive: i % 2 == 0,
        comments: commentList,
      };
      admin
        .firestore()
        .collection('memories')
        .doc('memory' + i)
        .create(mem);

      const user: IUser = {
        userId: 'user' + i,
        name: name[i],
        surname: surname[i],
        username: name[i] +'_'+ surname[i],
        email: emails[i],
        profileImgUrl: link,
        bio: 'A user',
        friendCount: Math.ceil(Math.random() * 10),
        memoryCount: Math.ceil(Math.random() * 10),
        accountTime: Math.ceil(Math.random() * 100),
        lastOnline: Timestamp.now(),
        online: i % 2 == 0,
        created: Timestamp.now(),
      };
      admin
        .firestore()
        .collection('users')
        .doc('user' + i)
        .create(user);

      const request: IFriendRequest = {
        senderId: 'user' + i,
        receiverId: 'user' + (14 - i),
        receiverUsername: name[i] +'_'+ surname[i],
        status:
          i % 2 == 0
            ? i > 10 - i
              ? FriendRequestStatus.ACCEPTED
              : FriendRequestStatus.PENDING
            : FriendRequestStatus.REJECTED,
        lastUpdated: Timestamp.now(),
        created: Timestamp.now(),
      };
      admin
        .firestore()
        .collection('friendrequests')
        .doc('user' + i + ' X user' + (14 - i))
        .create(request);
    }
  }
}
