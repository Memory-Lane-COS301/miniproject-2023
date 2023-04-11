import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemoryPageComponent } from './add-memory.page';

describe('AddMemoryPageComponent', () => {
  let component: AddMemoryPageComponent;
  let fixture: ComponentFixture<AddMemoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMemoryPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddMemoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
