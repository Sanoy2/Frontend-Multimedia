import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginForm } from '../models/LoginForm';
import {LoginService } from './service/login.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private cookieService: CookieService, private service: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login: string = '';
  password: string = '';
  errMsg: string = null;

  form = new LoginForm();

  Login() {
    this.form.login = this.login;
    this.form.password = this.password;
    this.service.Register(this.form,
      response => {
        if (response.ok === true) {
          this.cookieService.set('username', response.data.username);
          this.cookieService.set('uuid', response.data.uuid);
          this.router.navigate(['/Room'])
        }
        else {
          this.errMsg = response.error.message;
        }
      },
      error => {
        this.errMsg = error.message;
      }
    )
  }

}
