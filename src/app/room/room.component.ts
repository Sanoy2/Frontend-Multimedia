import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RoomService } from './service/room.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private cookieService: CookieService, private service: RoomService, private router: Router) { }

  ngOnInit() {
    this.uuid = this.cookieService.get('uuid');
    if (!this.uuid) {
      this.errMsg = 'Log in to create rooms';
    }
  }

  uuid: string = null;
  errMsg = null;
  chatUrl: string = null;

  CreateChatRoom() {
    this.service.CreateRoom(this.uuid,
      response => {
        if (response.ok) {
          let room_gid: string = response.data.room_gid;
          this.cookieService.set(room_gid, response.data.room_gid);
          this.router.navigate(['/chat/' + room_gid]);
        }
        else {
          this.errMsg = response.error.message;
        }
      },
      error => {
        console.log(error);
      })
  }

  Go() {
    let splits = this.chatUrl.split('/');
    let chatUrl = splits[splits.length - 1];
    this.router.navigate(['/chat/' + chatUrl]);
  }
}
