import { Component, OnInit } from '@angular/core';
import { ChatService } from './service/chat.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Message } from '../models/message';
import { MessageForm } from '../models/MessageForm';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  constructor(
    private service: ChatService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute, ) { }

  uuid: string = '';
  username: string = '';
  room_gid: string = '';
  message: Message;
  messageForm: MessageForm;
  bunchOfMessages: Array<Message>;
  private sub: any;

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.room_gid = params['room_gid'];
    });

    this.uuid = this.cookieService.get('uuid');
    this.username = this.cookieService.get('username');

    if (!this.uuid && !this.username) {
      this.router.navigate(['/login']);
    }

    if (!this.room_gid) {
      this.router.navigate(['/room']);
    }

    this.ClearInput();
    this.bunchOfMessages = [];
  }

  Send() {
    this.ClearInput();
  }

  GetMessages() {
    for (let i = 0; i < 10; i++) {
      let message = new Message();
      message.content = this.MakeId();
      message.username = '';
      message.username = this.getUsername();
      message.time = new Date();
      this.bunchOfMessages.push(message);
    }
  }


  ClearInput() {
    this.messageForm = new MessageForm();
    this.messageForm.room_gid = this.room_gid;
  }

  getRandomInt() {
    return Math.floor(Math.random() * Math.floor(10));
  }

  getSomething() {
    let a: string = '';
    for (let i = 0; i < 20; i++) {
      a += i;
    }
    return a;
  }

  getRandomInt2() {
    return Math.floor(Math.random() * Math.floor(2));
  }

  MakeId() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (let i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  getUsername() {
    let a = Math.floor(Math.random() * Math.floor(2));
    if (a > 0) {
      return 'abc';
    }
    else {
      return 'theMan';
    }
  }
}
