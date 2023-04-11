import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsPageComponent } from './search-results.page';
import { SearchPageComponent } from '@mp/app/search-page/feature';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('SearchResultsPage', () => {
  let component1: SearchResultsPageComponent;
  let component2: SearchPageComponent;
  let fixture1: ComponentFixture<SearchResultsPageComponent>;
  let fixture2: ComponentFixture<SearchPageComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [SearchResultsPageComponent],
  //   }).compileComponents();

  //   fixture = TestBed.createComponent(SearchResultsPageComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  //my tests (Reuben Jooste u21457060)
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultsPageComponent, SearchPageComponent],
      imports: [IonicModule.forRoot(), RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture1 = TestBed.createComponent(SearchResultsPageComponent);
    fixture2 = TestBed.createComponent(SearchPageComponent);
    component1 = fixture1.componentInstance;
    component2 = fixture2.componentInstance;
    fixture1.detectChanges();
    fixture2.detectChanges();
  });

  it('should change current filter to "Memories" when calling the setFilter("Memories") function', () => {
    component2.onSearch('example'); //we first need to navigate to the search-results page to run unit tests

    component1.setFilter('Memories');

    expect(component1.currentFilter).toEqual('Memories');
  });

  it('should change the variable showExpandedView to true when calling the changeMemoryView() function for the first time', () => {
    component2.onSearch('example'); //we first need to navigate to the search-results page to run unit tests

    component1.changeMemoryView();

    expect(component1.showExpandedView).toBeTruthy();
  });

  it('should toggle the variable showExpandedView to true and then to false when calling changeMemoryView() twice', () => {
    component2.onSearch('example'); //we first need to navigate to the search-results page to run unit tests

    component1.changeMemoryView();
    component1.changeMemoryView();

    expect(component1.showExpandedView).toBeFalsy();
  });
});
