import { Component, OnInit } from '@angular/core';
import { RegistrationForm } from '../models/RegistrationForm';
import { RegisterService } from './service/register.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: RegisterService, private router: Router) { }

  ngOnInit() {
  }

  form = new RegistrationForm();

  username = '';
  login = '';
  password = '';
  rePassword = '';
  errMsg: string = null;

  Register() {
    this.form.login = this.login;
    this.form.username = this.username;
    this.form.password = this.password;
    this.service.Register(this.form,
      response => {
        if (response.ok === true) {
          this.router.navigate(['/login']);
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
