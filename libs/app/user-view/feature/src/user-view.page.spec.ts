import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserViewPageComponent } from './user-view.page';
import { Store, NgxsModule } from '@ngxs/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UserViewPageComponent', () => {
  let component: UserViewPageComponent;
  let fixture: ComponentFixture<UserViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserViewPageComponent],
      imports: [NgxsModule.forRoot([])],
      providers: [Store],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    }).compileComponents()
        fixture = TestBed.createComponent(UserViewPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change button content to "You are friends" if the "Add friend" button is clicked and should set the "added" variable to true', () => {
    component.addedNewFriend();
    expect(component.isWaitingRequest).toBeTruthy();
  });

  it('should change button content to "Send friend request" if the "Unfriend" button is clicked and should set the "added" variable to false', () => {
    component.removeFriend();
    expect(component.isNotFriends).toBeTruthy();
  });
});
