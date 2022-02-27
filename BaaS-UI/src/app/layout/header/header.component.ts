import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {faQuestion} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faGithub = faGithub;
  faQuestion = faQuestion;

  constructor(public router: Router) {
  }


  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() logOutClicked = new EventEmitter<void>();

  ngOnInit(): void {

  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }
}
