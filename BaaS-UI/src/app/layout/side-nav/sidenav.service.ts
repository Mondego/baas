import {Injectable} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private sidenav: MatSidenav;
  private opened = false;

  constructor() {
  }

  public setSidenav(sidenav: MatSidenav) {
    if (!sidenav) {
      console.log('NavComponent: sidenav cannot be null');
    }
    this.sidenav = sidenav;
  }

  public getSideNave(): MatSidenav {
    return <MatSidenav>this.sidenav;
  }

  public open() {
    this.opened = true;
    // @ts-ignore
    return this.sidenav.open();
  }

  public close() {
    this.opened = false;
    // @ts-ignore
    return this.sidenav.close();
  }

  public toggle() {
    this.opened = !this.opened;
    // @ts-ignore
    return this.sidenav.toggle();
  }

  public isOpen(): boolean {
    return this.opened;
  }

}
