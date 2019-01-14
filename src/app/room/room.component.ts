import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  errMsg = null;
  CreateChatRoom() {
    this.errMsg = 'Sorry, an error occurred. Try again later.';
  }

}
