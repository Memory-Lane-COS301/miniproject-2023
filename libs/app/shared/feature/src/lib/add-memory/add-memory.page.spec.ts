import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalController, AlertController, IonicModule } from '@ionic/angular';
import { AddMemoryPageComponent } from './add-memory.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store, NgxsModule } from '@ngxs/store';
import { initializeApp } from 'firebase-admin/app';

describe('AddMemoryPageComponent', () => {
  let component: AddMemoryPageComponent;
  let fixture: ComponentFixture<AddMemoryPageComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMemoryPageComponent],
      imports: [IonicModule.forRoot(), NgxsModule.forRoot([])],
      providers: [ModalController],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddMemoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
