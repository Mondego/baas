import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isNextVersion = location.hostname.startsWith('next.material.angular.io');

  version = 1.1;

  ngOnInit(): void {
  }

  constructor() {

  }


}
