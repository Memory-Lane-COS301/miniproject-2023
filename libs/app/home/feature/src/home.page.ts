import { Component, OnInit } from '@angular/core';
import { IUser } from '@mp/api/users/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToUser } from '@mp/app/profile/util';
import { SubscribeToProfile as SubscribeToProfileView } from '@mp/app/profile-view/util';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MenubarService } from '@mp/app/services/feature';

@Component({
  selector: 'ms-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  menuShown: boolean;

  constructor(private store: Store, private menubarService: MenubarService) {
    this.menuShown = this.menubarService.menuStatus;
  }

  getMenuStatus() {
    return this.menubarService.menuStatus;
  }

  ionViewWillEnter() {
    this.store.dispatch(new SubscribeToUser());
    this.store.dispatch(new SubscribeToProfileView());
  }
}
