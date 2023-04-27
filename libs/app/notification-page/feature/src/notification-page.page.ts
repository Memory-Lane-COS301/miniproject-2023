import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { IComment } from "@mp/api/memories/util";
import { NotificationPageState } from "@mp/app/notification-page/data-access";
import { IUser } from "@mp/api/users/util";
import {
    DeleteFriendRequest,
    UpdateFriendRequest 
} from "@mp/app/notification-page/util";
import { ProfileState } from '@mp/app/profile/data-access';


@Component({
    selector: 'app-notification-page',
    templateUrl: './notification-page.page.html',
    styleUrls: ['./notification-page.page.scss'],
})
export class NotificationPage {
    @Select(NotificationPageState.friendRequests) friendRequests$!: Observable<IUser[] | null>;
    @Select(NotificationPageState.comments) comments$!: Observable<IComment[] | null>;
    @Select(ProfileState.time) time$!: Observable<IUser | null>;

    friendRequestsListExpanded = false;
    commentsListExpanded = false;
    commentsExpandedBadge = false;
    commentsCount = 0;
    friendRequestsCount = 0;

    toggleFriendRequestsList() {
        this.friendRequestsListExpanded = !this.friendRequestsListExpanded;
    }

    toggleCommentsList() {
        this.commentsCount = 0;
        this.commentsListExpanded = !this.commentsListExpanded;
        this.commentsExpandedBadge = true;
    }

    constructor(
        private store: Store
    ) {}

    acceptFriendRequest(uid: string | null | undefined, uname: string | null | undefined) {
        if (!uid || !uname) return;

        const friend : IUser = {
            userId: uid,
            username: uname
        }


        this.friendRequestsCount -= 1;
        this.store.dispatch(new UpdateFriendRequest(friend));
    }

    declineFriendRequest(uid: string | null | undefined, uname: string | null | undefined) {
        if (!uid || !uname) return;

        const friend : IUser = {
            userId: uid,
            username: uname
        }

        this.friendRequestsCount -= 1;
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
}