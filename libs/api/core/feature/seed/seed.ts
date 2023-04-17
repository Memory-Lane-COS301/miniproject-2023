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
    const name: string[] = ['Sam', 'John', 'Adam', 'Joe', 'Mike', 'Thabang', 'Themba', 'Jade', 'Vukani', 'Thulani'];
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
    ];

    const imgurls: string[] = [
      'https://cdn.pixabay.com/photo/2018/03/23/06/27/bird-3252791__340.jpg',
      'https://cdn.pixabay.com/photo/2021/08/21/13/31/butterfly-6562789__340.jpg',
      'https://cdn.pixabay.com/photo/2016/07/08/20/32/national-day-1505217__340.jpg',
      'https://cdn.pixabay.com/photo/2021/08/21/01/24/flower-6561562__340.jpg',
      'https://cdn.pixabay.com/photo/2020/03/11/04/54/city-4920974__340.jpg',
      'https://cdn.pixabay.com/photo/2022/11/16/20/51/trumpet-7596774__340.jpg',
      'https://cdn.pixabay.com/photo/2015/08/08/19/10/cows-880711__340.jpg',
      'https://cdn.pixabay.com/photo/2015/12/07/08/12/ko-1080392__340.jpg',
      'https://cdn.pixabay.com/photo/2012/09/04/19/57/post-horn-56003__340.jpg',
      'https://cdn.pixabay.com/photo/2019/12/22/12/07/deer-4712382__340.jpg',
      'https://cdn.pixabay.com/photo/2015/03/23/12/28/cows-686045__340.jpg',
      'https://cdn.pixabay.com/photo/2019/08/08/16/54/cpu-4393375__340.jpg',
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
    ];

    const comment: IComment = {
      userId: '123456789',
      commentId: '987654321',
      username: 'a user',
      text: 'Generic text that should take a up a while bunch of space for no reason and now some keyboard mashing dtcfvgb hjlkmfjknjlmkfghjnkm,sdxrfctvgybhunjimk,ldrcftvgybhunjimkol,dcfvgbhnjmklcfgvbhnjmk,l.;dfcgv hbkm.dcftvgybhunjimko,lp.;[drcfgvtbhunjmk,lp.;dfc gvhbmkc gvkmfvgbhujnimo,l;.[/dcftvgybhujnkmpl.;[/',
    };

    for (let i = 0; i < 9; i++) {
      const count = Math.ceil(Math.random() * 4);
      const commentList: IComment[] = [];
      for (let k = 0; k < count; k++) {
        comment.commentId = Math.ceil(Math.random() * 100000) + '';
        commentList.push(comment);
      }

      const mem: IMemory = {
        userId: 'user' + i,
        memoryId: 'memory' + (10 - i),
        username: name[i] + surname[i],
        title: 'A memory posted by user' + i,
        description: 'Some fake data for seeding purposes',
        imgUrl: imgurls[i],
        profileImgUrl: imgurls[i],
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
        username: name[i] + surname[i],
        email: emails[i],
        profileImgUrl: imgurls[i],
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
        receiverId: 'user' + (10 - i),
        receiverUsername: name[i] + surname[i],
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
        .doc('user' + i + 'Xuser' + (10 - i))
        .create(request);
    }
  }
}
