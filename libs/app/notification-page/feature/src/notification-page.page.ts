import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Select, Store } from "@ngxs/store";
import { ViewedCommentsState } from "@mp/app/view-comments/data-access";
import { Observable } from "rxjs";
import { IComment } from "@mp/api/memories/util";
import { CreateCommentRequest } from "@mp/app/view-comments/util";


@Component({
    selector: 'app-notification-page',
    templateUrl: './notification-page.page.html',
    styleUrls: ['./notification-page.page.scss'],
})
export class NotificationPage {}