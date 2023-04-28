import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { ViewedCommentsState } from '@mp/app/view-comments/data-access';
import { Observable } from 'rxjs';
import { IComment } from '@mp/api/memories/util';
import { CreateCommentRequest } from '@mp/app/view-comments/util';
import { IUser } from '@mp/api/users/util';
import { ProfileState } from "@mp/app/profile/data-access";
import { CheckUserFriendStatus, GetUserProfileRequest } from "@mp/app/user-view/util";

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.page.html',
  styleUrls: ['./view-comments.page.scss'],
})
export class ViewCommentsPageComponent {
  @Select(ViewedCommentsState.viewedComments) viewedComments$!: Observable<IComment[] | null>;

  new_comment = '';

  constructor(private store: Store, private navCtrl: NavController) {}

  get Comments() {
    return this.viewedComments$;
  }

  addNewComment() {
    const comment = this.new_comment;
    this.new_comment = '';
    this.store.dispatch(new CreateCommentRequest(comment));
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
            this.store.dispatch(new CheckUserFriendStatus(request_user));
            this.store.dispatch(new GetUserProfileRequest(request_user));
            this.navCtrl.navigateForward('/user-view');
        }
    }
}
}
