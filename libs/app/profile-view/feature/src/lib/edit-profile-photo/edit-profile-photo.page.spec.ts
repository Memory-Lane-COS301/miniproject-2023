import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularDelegate, ModalController } from '@ionic/angular';
import { EditProfilePhotoPageComponent } from './edit-profile-photo.page';
import { Store, NgxsModule } from '@ngxs/store';

describe('EditProfilePhotoPageComponent', () => {
  let component: EditProfilePhotoPageComponent;
  let fixture: ComponentFixture<EditProfilePhotoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProfilePhotoPageComponent],
      providers: [ModalController, AngularDelegate, Store],
      imports: [NgxsModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProfilePhotoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
