import { Component, OnInit } from '@angular/core';
import { RegistrationForm } from '../models/RegistrationForm';
import { RegisterService } from './service/register.service';
import { Router } from "@angular/router";
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: RegisterService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => { 
      document.getElementById("username").focus();
    }, 1);
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
    this.form.password =  Md5.hashStr(this.password) as string;
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

  onKeydown(event) {
    if (event.key === "Enter") {
      this.Register();
    }
  }
}
