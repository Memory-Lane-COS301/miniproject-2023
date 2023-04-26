import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { IComment } from "@mp/api/memories/util";
import { NotificationPageState } from "@mp/app/notification-page/data-access";
import { IUser } from "@mp/api/users/util";
import {
    DeleteFriendRequest,
    SetNotificationPage,
    UpdateFriendRequest 
} from "@mp/app/notification-page/util";
import { ProfileState } from "@mp/app/profile/data-access";
import { GetUserProfileRequest } from "@mp/app/user-view/util";


@Component({
    selector: 'app-notification-page',
    templateUrl: './notification-page.page.html',
    styleUrls: ['./notification-page.page.scss'],
})
export class NotificationPage implements OnInit {
    @Select(NotificationPageState.friendRequests) friendRequests$!: Observable<IUser[] | null>;
    @Select(NotificationPageState.comments) comments$!: Observable<IComment[] | null>;

    friendRequestsListExpanded = false;
    commentsListExpanded = false;

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
            userId: "0b0a0318-b8eb-4f5f-87ae-038bd299248d",
            username: "Maryjane.Maggio11",
            profileImgUrl: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/448.jpg",
            text: "Example comment jakbhbdcjhsjdcbsjdcb"
        },
        {
            userId: "qk29zJ5i8y5omsE9uYXTWPdWOMbP",
            username: "testing",
            profileImgUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
            text: "Example comment jakbhbdcjhsjdcbsjdcb"
        },
        {
            userId: "0cf0c171-a04e-464d-b9b8-4dfdd0262ea8",
            username: "Bruce71",
            profileImgUrl: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/276.jpg",
            text: "Example comment jakbhbdcjhsjdcbsjdcb"
        },
        {
            userId: "2f58a3a9-a93a-4f2d-ab97-08a933088ddb",
            username: "Peggie.Reynolds10",
            profileImgUrl: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/887.jpg",
            text: "Example comment jakbhbdcjhsjdcbsjdcb"
        },
    ]

    toggleFriendRequestsList() {
        this.friendRequestsListExpanded = !this.friendRequestsListExpanded;
    }

    toggleCommentsList() {
        this.commentsListExpanded = !this.commentsListExpanded;
    }

    constructor(
        private store: Store,
        private navCtrl: NavController
    ) {}

    ngOnInit(): void {
        this.store.dispatch(new SetNotificationPage(this.friendsRequests, this.commentNotifications));
    }

    acceptFriendRequest(uid: string | null | undefined, uname: string | null | undefined) {
        if (!uid || !uname) return;

        const friend : IUser = {
            userId: uid,
            username: uname
        }

        this.store.dispatch(new UpdateFriendRequest(friend));
    }

    declineFriendRequest(uid: string | null | undefined, uname: string | null | undefined) {
        if (!uid || !uname) return;

        const friend : IUser = {
            userId: uid,
            username: uname
        }

        this.store.dispatch(new DeleteFriendRequest(friend))
    }

    getCommentsLength() {
        let size = 0;

        this.comments$.subscribe((comments) => {
            if (!comments) return;

            size = comments.length;
        })

        return size;
    }

    getFriendRequestsLength(){
        let size = 0;

        this.friendRequests$.subscribe((friendRequests$) => {
            if (!friendRequests$) return;

            size = friendRequests$.length;
        })

        return size;
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
}