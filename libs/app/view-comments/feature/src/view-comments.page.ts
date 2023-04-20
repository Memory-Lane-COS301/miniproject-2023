import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Select } from "@ngxs/store";
import { ViewedCommentsState } from "@mp/app/view-comments/data-access";
import { Observable } from "rxjs";
import { IComment } from "@mp/api/memories/util";


@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.page.html',
  styleUrls: ['./view-comments.page.scss'],
})
export class ViewCommentsPageComponent {
  @Select(ViewedCommentsState.viewedComments) viewedComments$!: Observable<IComment[] | null>;
  
  new_comment = '';

  constructor(private navCtrl: NavController) {}

  get Comments(){
    return this.viewedComments$;
  }

  openUserProfile() {
    this.navCtrl.navigateForward('/view-all-comments');
  }
}