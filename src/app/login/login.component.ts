import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
  }

  login: string = '';
  password: string = '';
  errMsg: string = null;

  Login() {
    this.cookieService.set('login', this.login);
  }

}
