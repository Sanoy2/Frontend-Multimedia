import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../models/message';

@Component({
  selector: 'app-message-on-list',
  templateUrl: './message-on-list.component.html',
  styleUrls: ['./message-on-list.component.css']
})
export class MessageOnListComponent implements OnInit {

  @Input()
  message: Message;

  @Input()
  isMessageFromMe: boolean;

  showTime: boolean;

  constructor() { }

  ngOnInit() {
    this.showTime = false;
  }

  messageClicked() {
    this.showTime = !this.showTime;
    console.log("clicked");
  }

}
