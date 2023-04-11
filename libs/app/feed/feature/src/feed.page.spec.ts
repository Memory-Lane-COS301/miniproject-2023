import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularDelegate, ModalController } from '@ionic/angular';
import { AddMemoryPageComponent } from '@mp/app/shared/feature';

import { FeedPageComponent } from './feed.page';

describe('FeedPageComponent', () => {
  let component1: FeedPageComponent;
  let fixture1: ComponentFixture<FeedPageComponent>;
  let modalController: ModalController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedPageComponent, AddMemoryPageComponent],
      providers: [ModalController, AngularDelegate],
    }).compileComponents();

    fixture1 = TestBed.createComponent(FeedPageComponent);
    component1 = fixture1.componentInstance;
    fixture1.detectChanges();

    modalController = TestBed.inject(ModalController);
  });

  it('should create', () => {
    expect(component1).toBeTruthy();
  });

  it('should open a modal when the button is clicked', () => {
    const modalController = TestBed.inject(ModalController);
    const presentSpy = jest.spyOn(modalController, 'create');

    const button = fixture1.nativeElement.querySelector('ion-buttons');
    button.click();
    fixture1.detectChanges();

    expect(presentSpy).toHaveBeenCalled();
  });

  it('should change the variable showExpandedView to true when calling the changeMemoryView() function for the first time', () => {
    component1.changeMemoryView();

    expect(component1.showExpandedView).toBeTruthy();
  });

  it('should toggle the variable showExpandedView to true and then to false when calling changeMemoryView() twice', () => {
    component1.changeMemoryView();
    component1.changeMemoryView();

    expect(component1.showExpandedView).toBeFalsy();
  });
});
