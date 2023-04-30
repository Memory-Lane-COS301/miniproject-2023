import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MemoryCardComponent } from './memory-card.component';
import { Store, NgxsModule } from '@ngxs/store';
import { MemoryCardApi, MemoryCardState } from '@mp/app/shared/data-access';

describe('MemoryCardComponent', () => {
  let component: MemoryCardComponent;
  let fixture: ComponentFixture<MemoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemoryCardComponent],
      imports: [NgxsModule.forRoot([MemoryCardState])],
      providers: [Store, MemoryCardApi],
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
