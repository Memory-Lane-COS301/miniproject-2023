import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MemoryCardComponent } from './memory-card.component';

describe('MemoryCardComponent', () => {
  let component: MemoryCardComponent;
  let fixture: ComponentFixture<MemoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemoryCardComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    }).compileComponents();

    fixture = TestBed.createComponent(MemoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
