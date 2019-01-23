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

  constructor() { }

  ngOnInit() {

  }

}
