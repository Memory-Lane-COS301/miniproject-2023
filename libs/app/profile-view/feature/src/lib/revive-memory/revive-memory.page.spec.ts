import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularDelegate, ModalController } from '@ionic/angular';
import { ReviveMemoryPageComponent } from './revive-memory.page';

describe('ReviveMemoryPage', () => {
  let component: ReviveMemoryPageComponent;
  let fixture: ComponentFixture<ReviveMemoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviveMemoryPageComponent],
      providers: [ModalController, AngularDelegate],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviveMemoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
