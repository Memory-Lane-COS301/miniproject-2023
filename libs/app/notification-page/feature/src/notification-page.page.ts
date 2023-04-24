import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Select, Store } from "@ngxs/store";
import { ViewedCommentsState } from "@mp/app/view-comments/data-access";
import { Observable } from "rxjs";
import { IComment } from "@mp/api/memories/util";
import { CreateCommentRequest } from "@mp/app/view-comments/util";
import { NotificationPageState } from "@mp/app/notification-page/data-access";
import { IUser } from "@mp/api/users/util";


@Component({
    selector: 'app-notification-page',
    templateUrl: './notification-page.page.html',
    styleUrls: ['./notification-page.page.scss'],
})
export class NotificationPage {
    @Select(NotificationPageState.friendRequests) friendRequests$!: Observable<IUser[] | null>;
    @Select(NotificationPageState.comments) comments$!: Observable<IComment[] | null>;

    //Mock data for testing html
    mock_requests : IUser[] = [
        {
            userId: "jsdjbsdbjhdsbcjshbdcjbsdchs",
            username: "John_do3",
            name: "John",
            surname: "Doe",
            profileImgUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        },
        {
            userId: "jsdjbsdbjhdsbcjshbdcjbsdchs",
            username: "John_do3",
            name: "John",
            surname: "Doe",
            profileImgUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        },
        {
            userId: "jsdjbsdbjhdsbcjshbdcjbsdchs",
            username: "John_do3",
            name: "John",
            surname: "Doe",
            profileImgUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        }
    ];

    mock_comments : IComment[] = [
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
    ];

    friendRequestsListExpanded = false;
    commentsListExpanded = false;

    toggleFriendRequestsList() {
        this.friendRequestsListExpanded = !this.friendRequestsListExpanded;
    }

    toggleCommentsList() {
        this.commentsListExpanded = !this.commentsListExpanded;
    }

    constructor(
        private store: Store
    ) {}

    get FriendRequests() {
        return this.mock_requests;
    }

    get Comments() {
        return this.mock_comments;
    }
}