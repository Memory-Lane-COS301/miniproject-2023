import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IUser } from '@mp/api/users/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { Logout, UpdateUserDetails } from '@mp/app/profile/util';
import {
    ActionsExecuting,
    actionsExecuting
} from '@ngxs-labs/actions-executing';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-profile-user-details-component',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  @Select(ProfileState.user) user$!: Observable<IUser | null>;
  @Select(actionsExecuting([UpdateUserDetails]))
  busy$!: Observable<ActionsExecuting>;

  userDetailsForm = this.fb.group({
    name: ['', [Validators.minLength(1), Validators.maxLength(64)]],
    surname: ['', [Validators.minLength(1), Validators.maxLength(64)]],
    username: ['', [Validators.minLength(1), Validators.maxLength(64)]],
    email: ['', [Validators.minLength(1), Validators.maxLength(64)]],
    bio: ['', [Validators.minLength(1), Validators.maxLength(128)]],
  });
  showPassword = false;

  get name() {
    return this.userDetailsForm.get('name');
  }

  get surname() {
    return this.userDetailsForm.get('surname');
  }

  get username() {
    return this.userDetailsForm.get('username');
  }

  get email() {
    return this.userDetailsForm.get('email');
  }

  get bio() {
    return this.userDetailsForm.get('bio');
  }

  get password() {
    return this.userDetailsForm.get('password');
  }

  get nameError(): string {
    if (this.name?.errors?.['required'])
      return 'Name is required';
    if (this.name?.errors?.['minlength'])
      return 'Name should be longer than 1 characters';
    if (this.name?.errors?.['maxlength'])
      return 'Name should be shorter than 64 characters';

    return 'Name is invalid';
  }

  get surnameError(): string {
    if (this.name?.errors?.['required'])
      return 'Surname is required';
    if (this.name?.errors?.['minlength'])
      return 'Surname should be longer than 1 characters';
    if (this.name?.errors?.['maxlength'])
      return 'Surname should be shorter than 64 characters';

    return 'Username is invalid';
  }

  get usernameError(): string {
    if (this.name?.errors?.['required'])
      return 'Username is required';
    if (this.name?.errors?.['minlength'])
      return 'Username should be longer than 1 characters';
    if (this.name?.errors?.['maxlength'])
      return 'Username should be shorter than 64 characters';

    return 'Username is invalid';
  }

  get emailError(): string {
    if (this.email?.errors?.['required']) return 'Email is required';
    if (this.email?.errors?.['email']) return 'Email is invalid';
    if (this.email?.errors?.['minlength'])
      return 'Email should be longer than 1 characters';
    if (this.email?.errors?.['maxlength'])
      return 'Email should be shorter than 64 characters';

    return 'Email is invalid';
  }

  get passwordError(): string {
    if (this.password?.errors?.['required']) return 'Password is required';
    if (this.password?.errors?.['minlength'])
      return 'Password should be longer than 6 characters';
    if (this.password?.errors?.['maxlength'])
      return 'Password should be shorter than 64 characters';

    return 'Password is invalid';
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}

  logout() {
    this.store.dispatch(new Logout());
  }

  updateUserDetails() {
    this.store.dispatch(new UpdateUserDetails());
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.userDetailsForm.patchValue({
          name: user.name,
          surname: user.surname,
          username: user.username,
          email: user.email,
          bio: user.bio,
        });
      }
    });
  }
}
