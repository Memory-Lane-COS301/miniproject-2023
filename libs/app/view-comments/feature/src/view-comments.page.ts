import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { ViewedCommentsState } from '@mp/app/view-comments/data-access';
import { Observable } from 'rxjs';
import { IComment } from '@mp/api/memories/util';
import { CreateCommentRequest } from '@mp/app/view-comments/util';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.page.html',
  styleUrls: ['./view-comments.page.scss'],
})
export class ViewCommentsPageComponent {
  @Select(ViewedCommentsState.viewedComments) viewedComments$!: Observable<IComment[] | null>;

  new_comment = '';

  constructor(private store: Store) {}

  get Comments() {
    return this.viewedComments$;
  }

  addNewComment() {
    const comment = this.new_comment;
    this.new_comment = '';
    this.store.dispatch(new CreateCommentRequest(comment));
  }
}
