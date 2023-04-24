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

    constructor(
        private store: Store
    ) {}
}