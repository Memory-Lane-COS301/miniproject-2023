import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { IComment } from "@mp/api/memories/util";
import { NotificationPageState } from "@mp/app/notification-page/data-access";
import { IUser } from "@mp/api/users/util";
import {
    DeleteFriendRequest,
    SetCommentsNotificationAmount,
    SetNotificationAmount,
    UpdateFriendRequest 
} from "@mp/app/notification-page/util";
import { ProfileState } from "@mp/app/profile/data-access";
import { CheckUserFriendStatus, GetUserProfileRequest } from "@mp/app/user-view/util";


@Component({
    selector: 'app-notification-page',
    templateUrl: './notification-page.page.html',
    styleUrls: ['./notification-page.page.scss'],
})
export class NotificationPage {
    @Select(NotificationPageState.friendRequests) friendRequests$!: Observable<IUser[] | null>;
    @Select(NotificationPageState.comments) comments$!: Observable<IComment[] | null>;
    @Select(NotificationPageState.notificationAmount) notificationAmount$!: Observable<number>;
    @Select(NotificationPageState.commentsAmount) commentsAmount$!: Observable<number>;
    @Select(ProfileState.time) time$!: Observable<IUser | null>;

    friendRequestsListExpanded = false;
    commentsListExpanded = false;
    commentsExpandedBadge = false;
    commentsCount = 0;
    commentNotificationCount = 0;
    friendRequestsCount = 0;
    notificationCount = 0;

    toggleFriendRequestsList() {
        this.friendRequestsListExpanded = !this.friendRequestsListExpanded;
    }

    toggleCommentsList() {
        this.commentsCount = 0;
        this.commentsListExpanded = !this.commentsListExpanded;
        this.commentsExpandedBadge = true;
        this.commentsCount = 0;
        this.notificationCount = this.friendRequestsCount + this.commentsCount;

        this.store.dispatch(new SetCommentsNotificationAmount(this.commentsCount))
        this.store.dispatch(new SetNotificationAmount(this.notificationCount));
    }

    constructor(
        private store: Store,
        private navCtrl: NavController
    ) {
        this.notificationAmount$.subscribe((value) => {
            this.notificationCount = value;
        })

        this.commentsAmount$.subscribe((value) => {
            this.commentNotificationCount = value;
        })
    }
    acceptFriendRequest(senderUsername: string | null | undefined) {
        const userState = this.store.selectSnapshot(ProfileState.user);

        if (!senderUsername || !userState?.username) return;

        const friend : IUser = {
            userId: '',
            username: senderUsername
        }


        this.friendRequestsCount -= 1;

        this.notificationCount = this.friendRequestsCount + this.commentNotificationCount;
        this.store.dispatch(new SetNotificationAmount(this.notificationCount));
        this.store.dispatch(new UpdateFriendRequest(friend));
    }

    declineFriendRequest(uid: string | null | undefined, uname: string | null | undefined) {
        if (!uid || !uname) return;

        const friend : IUser = {
            userId: uid,
            username: uname
        }

        this.friendRequestsCount -= 1;

        this.notificationCount = this.friendRequestsCount + this.commentNotificationCount;
        this.store.dispatch(new SetNotificationAmount(this.notificationCount));

        this.store.dispatch(new DeleteFriendRequest(friend))
    }

    getCommentsLength() {
        this.commentsCount = 0;

        this.comments$.subscribe((comments) => {
            if (!comments) return;

            this.commentsCount = comments.length;
        })

        return this.commentsCount;
    }

    getFriendRequestsLength(){
        this.friendRequestsCount = 0;

        this.friendRequests$.subscribe((friendRequests$) => {
            if (!friendRequests$) return;

            this.friendRequestsCount = friendRequests$.length;
        })

        return this.friendRequestsCount;
    }

    openUserProfile(uid: string | null | undefined, uname: string | null | undefined) {
        const user = this.store.selectSnapshot(ProfileState.user);

        if(!uid || !uname) return;

        if (user && user.userId && user.username) {
            if (uid != user.userId && uname != user.name) {
                const request_user : IUser = {
                    userId: uid,
                    username: uname
                }
                this.store.dispatch(new GetUserProfileRequest(request_user));
                this.navCtrl.navigateForward('/user-view');
            }
        }
    }

    checkForMyComment(uid: string | null | undefined) {
        const user = this.store.selectSnapshot(ProfileState.user);

        if(!uid) return;

        if (uid === user?.userId) {
            return "- You";
        }

        return '';
    }
}