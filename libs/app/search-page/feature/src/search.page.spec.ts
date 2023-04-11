import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { SearchPageComponent } from './search.page';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [SearchPageComponent],
  //   }).compileComponents();

  //   fixture = TestBed.createComponent(SearchPageComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();

  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  //my tests (Reuben Jooste u21457060)
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchPageComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set the variable "searchFocus" to true when clicking on the ion-searchbar component', () => {
    //test if the searchFocus variable changed from false to true when setting the focus of the search bar to true
    component.onSearchFocus();

    expect(component.searchFocus).toBeTruthy();
  });

  it('should set the variable "searchFocus" to false when clicking "Cancel" to cancel a search i.e. changing searchbar from focus to blur', () => {
    //test if the searchFocus variable changed from false to true when setting the focus of the search bar to true
    component.onSearchBlur();

    expect(component.searchFocus).toBeFalsy();
  });
});
