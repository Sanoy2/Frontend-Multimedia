import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
  }

  login: string = null;
  errMsg = null;
  CreateChatRoom() {
    this.login = this.cookieService.get('login');
  }

}
