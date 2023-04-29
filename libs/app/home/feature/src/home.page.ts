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
import { SetCommentsNotificationAmount, SetNotificationPage, GetAllPendingFriendRequests } from '@mp/app/notification-page/util';


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

  // ngOnInit(): void {
    // setInterval(() => {
    //   this.store.dispatch(new GetAllPendingFriendRequests())
    // },5000);
  // }

  getMenuStatus() {
    return this.menubarService.menuStatus;
  }

  ionViewWillEnter() {
    this.store.dispatch(new SubscribeToProfileView());
    this.store.dispatch(new SubscribeToUser());
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
