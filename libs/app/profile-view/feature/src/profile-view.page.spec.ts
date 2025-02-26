import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularDelegate, ModalController } from '@ionic/angular';
import { AddMemoryPageComponent } from '@mp/app/shared/feature';
import { ProfileViewPageComponent } from './profile-view.page';
import { Select, Store, NgxsModule } from '@ngxs/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ProfileViewPage', () => {
  let component1: ProfileViewPageComponent;
  let fixture1: ComponentFixture<ProfileViewPageComponent>;
  let modalController: ModalController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileViewPageComponent, AddMemoryPageComponent],
      imports: [NgxsModule.forRoot([])],
      providers: [ModalController, AngularDelegate, Store],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture1 = TestBed.createComponent(ProfileViewPageComponent);
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
});
