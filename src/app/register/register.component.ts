import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  username = '';
  login = '';
  password = '';
  rePassword = '';
  errMsg:string = null;

  Register() {
    this.errMsg = 'Error error error';
  }
}
