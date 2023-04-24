import { Component, OnInit } from '@angular/core';
import { IUser } from '@mp/api/users/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Logout } from '@mp/app/profile/util';

@Component({
  selector: 'ms-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @Select(ProfileState.user) user$!: Observable<IUser | null>;

  previousPageName = '';

  constructor(
    private route: ActivatedRoute,
    private readonly store: Store
  ) {}

  logout() {
    this.store.dispatch(new Logout());
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.previousPageName = params.get('from') === 'profile-view' ? 'Profile' : 'Dashboard';
    });
  }
}
