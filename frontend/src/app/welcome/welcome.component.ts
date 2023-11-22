import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from '../app.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit  {

  showWelcome: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const excludeWelcomePaths = ['/survey*', '/retrieve', '/update']
        this.showWelcome = !excludeWelcomePaths.some(path => new RegExp(path).test(window.location.pathname));
      }
    });
  }
}
