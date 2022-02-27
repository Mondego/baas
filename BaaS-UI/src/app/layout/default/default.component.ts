import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {SidenavService} from "../side-nav/sidenav.service";


@Component({
    selector: 'app-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

    @ViewChild('commandbarSidenav', {static: true})
    public sidenav: MatSidenav;
    constructor(private sidenavService: SidenavService) {
        this.sidenavService.setSidenav(this.sidenav);
    }

    ngOnInit() {

    }


}


/*
mobileQuery: MediaQueryList;
private _mobileQueryListener: () => void;
isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

constructor(private breakpointObserver: BreakpointObserver,media: MediaMatcher,changeDetectorRef: ChangeDetectorRef) {
  this.mobileQuery = media.matchMedia('(max-width: 600px)');
  this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  this.mobileQuery.addListener(this._mobileQueryListener);
}
ngOnDestroy(): void {
  this.mobileQuery.removeListener(this._mobileQueryListener);
}
goToLink(url: string){
  window.open(url, "_blank");
}
*/
