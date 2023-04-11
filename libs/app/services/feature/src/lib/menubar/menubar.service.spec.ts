import { TestBed } from '@angular/core/testing';

import { MenubarService } from './menubar.service';

describe('MenubarService', () => {
  let service: MenubarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenubarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
