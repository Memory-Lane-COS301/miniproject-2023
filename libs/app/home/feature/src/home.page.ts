import { Component, OnInit } from '@angular/core';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MenubarService } from '@mp/app/services/feature';

@Component({
  selector: 'ms-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;

  menuShown: boolean;

  constructor(private store: Store, private menubarService: MenubarService) {
    this.menuShown = this.menubarService.menuStatus;
  }

  getMenuStatus() {
    return this.menubarService.menuStatus;
  }

  ionViewWillEnter() {
    this.store.dispatch(new SubscribeToProfile());
  }
}
