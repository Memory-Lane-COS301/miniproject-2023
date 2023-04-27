import { Component, OnInit } from '@angular/core';
import { IUser } from '@mp/api/users/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToUser } from '@mp/app/profile/util';
import { SubscribeToProfile as SubscribeToProfileView } from '@mp/app/profile-view/util';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { MenubarService } from '@mp/app/services/feature';
import { NotificationPageState } from '@mp/app/notification-page/data-access';
import { IComment } from '@mp/api/memories/util';
import { SetCommentsNotificationAmount, SetNotificationPage } from '@mp/app/notification-page/util';

@Component({
  selector: 'ms-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @Select(NotificationPageState.friendRequests) friendRequests$!: Observable<IUser[] | null>;
  @Select(NotificationPageState.comments) comments$!: Observable<IComment[] | null>;
  @Select(NotificationPageState.notificationAmount) notificationAmount$!: Observable<number>;
  @Select(NotificationPageState.commentsAmount) commentsAmount$!: Observable<number>;

  totalNotifications: number;
  totalComments: number;
  totalFriedRequests: number;
  subscription: Subscription;
  menuShown: boolean;
  navigated: boolean;
  noNotifications: boolean;

  constructor(private store: Store, private menubarService: MenubarService) {
    this.menuShown = this.menubarService.menuStatus;
    this.totalNotifications = 0;
    this.totalComments = 0;
    this.totalFriedRequests = 0;
    this.subscription = new Subscription();
    this.navigated = false;
    this.noNotifications = false;
  }

  friendsRequests = [
    {
        userId: "1",
        username: "John_do3",
        name: "John",
        surname: "Doe",
        profileImgUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
        userId: "2",
        username: "John_do3",
        name: "John",
        surname: "Doe",
        profileImgUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
        userId: "3",
        username: "John_do3",
        name: "John",
        surname: "Doe",
        profileImgUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },        
    {
        userId: "4",
        username: "John_do3",
        name: "John",
        surname: "Doe",
        profileImgUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },        
    {
        userId: "5",
        username: "John_do3",
        name: "John",
        surname: "Doe",
        profileImgUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },        
    {
        userId: "6",
        username: "John_do3",
        name: "John",
        surname: "Doe",
        profileImgUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },        
    {
        userId: "7",
        username: "John_do3",
        name: "John",
        surname: "Doe",
        profileImgUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },        
    {
        userId: "8",
        username: "John_do3",
        name: "John",
        surname: "Doe",
        profileImgUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },        
    {
        userId: "9",
        username: "John_do3",
        name: "John",
        surname: "Doe",
        profileImgUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    }
];
commentNotifications = [
    {
        userId: "jsdjbsdbjhdsbcjshbdcjbsdchs",
        username: "John_do3",
        profileImgUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        text: "Example comment jakbhbdcjhsjdcbsjdcb"
    },
    {
        userId: "jsdjbsdbjhdsbcjshbdcjbsdchs",
        username: "John_do3",
        profileImgUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        text: "Example comment jakbhbdcjhsjdcbsjdcb"
    },
    {
        userId: "jsdjbsdbjhdsbcjshbdcjbsdchs",
        username: "John_do3",
        profileImgUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        text: "Example comment jakbhbdcjhsjdcbsjdcb"
    },
]

  getMenuStatus() {
    return this.menubarService.menuStatus;
  }

  ionViewWillEnter() {
    this.store.dispatch(new SubscribeToUser());
    this.store.dispatch(new SubscribeToProfileView());
  }

  getAllNotifications(): number{
    this.subscription = this.comments$.subscribe(
      value => {
        if (value) {
          this.totalComments = value?.length;
        }
      }
    )

    this.subscription = this.friendRequests$.subscribe(
      value => {
        if (value) {
          this.totalFriedRequests = value?.length;
        }
      }
    )
    this.notificationAmount$.subscribe(
      (value) => {
        this.totalNotifications = value;
      }
    )

    this.commentsAmount$.subscribe((value) => {
      this.totalComments = value;
    })
    
    this.totalNotifications = this.totalComments + this.totalFriedRequests;

    if (this.totalNotifications === 0) {
      this.noNotifications = true;
    }
    return this.totalNotifications;
  
  }

  ngOnInit() {
    this.store.dispatch(new SetNotificationPage(this.friendsRequests, this.commentNotifications));
    this.comments$.subscribe((value) => {
      if (value) this.totalComments = value?.length;
    })
    this.store.dispatch(new SetCommentsNotificationAmount(this.totalComments))
    this.notificationAmount$.subscribe((value) => {
      this.totalNotifications = value;
    })
  }

  //prevents memory leaks
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
