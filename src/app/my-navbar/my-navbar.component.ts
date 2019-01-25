import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-navbar',
  templateUrl: './my-navbar.component.html',
  styleUrls: ['./my-navbar.component.css']
})
export class MyNavbarComponent implements OnInit {

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    let uuid = this.cookieService.get('uuid');
    let username = this.cookieService.get('username');

    if (uuid && username) {
      this.loggedIn = true;
      this.username = username;
    }
    else {
      this.loggedIn = false;
    }
  }

  Logout() {
    this.loggedIn = false;
    this.cookieService.deleteAll();
    this.cookieService.delete('uuid');
    this.cookieService.delete('username');

    setTimeout(() => { this.router.navigate(['/login']); }, 500);
  }

  loggedIn: boolean = false;
  username: string = null;

}
