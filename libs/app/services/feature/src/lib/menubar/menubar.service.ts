import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenubarService {
  private menuShown = false;

  set menuStatus(value: boolean) {
    this.menuShown = value;
  }

  get menuStatus(): boolean {
    return this.menuShown;
  }
}
