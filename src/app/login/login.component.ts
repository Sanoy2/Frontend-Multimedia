import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginForm } from '../models/LoginForm';
import { LoginService } from './service/login.service'
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private cookieService: CookieService, private service: LoginService, private router: Router) { }

  ngOnInit() {
    let uuid = this.cookieService.get('uuid');
    let username = this.cookieService.get('username');

    if (uuid && username) {
      setTimeout(() => { this.router.navigate(['/room']); }, 200);
    }

    setTimeout(() => {
      document.getElementById("login").focus();
    }, 1);
  }

  login: string = '';
  password: string = '';
  errMsg: string = null;

  form = new LoginForm();

  Login() {
    this.form.login = this.login;
    this.form.password = Md5.hashStr(this.password) as string;
    this.service.Login(this.form,
      response => {
        if (response.ok === true) {
          this.cookieService.set('username', response.data.username);
          this.cookieService.set('uuid', response.data.uuid);
          setTimeout(() => { this.router.navigate(['/room']); }, 200);
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

  onKeydown(event) {
    if (event.key === "Enter") {
      this.Login();
    }
  }

}
