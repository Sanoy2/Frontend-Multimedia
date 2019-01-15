import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
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

export class ChatComponent implements OnInit, AfterViewChecked {
  constructor(
    private service: ChatService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute, ) { }

  uuid: string = '';
  username: string = '';
  room_gid: string = '';
  messageForm: MessageForm;
  bunchOfMessages: Array<Message>;
  errMsg: string = null;
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

    this.GetAllMessages();
    this.ClearInput();
  }

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  Send() {
    this.service.SendMessage(this.messageForm,
      response => {
        if (response.ok === true) {
        }
        else {
          this.errMsg = response.error.message;
        }
      },
      error => {
        this.errMsg = error.message;
      }
    )
    this.ClearInput();
    this.GetAllMessages();
  }

  RollDown() {

  }

  GetAllMessages() {
    this.bunchOfMessages = [];
    this.service.GetMessages(this.room_gid,
      response => {
        if (response.ok === true) {
          for (let i = 0; i < response.data.length; i++) {
            let message = new Message();
            message.username = response.data[i].sender.username;
            message.content = response.data[i].msg.txt;
            message.time = new Date(response.data[i].msg.timestamp);
            this.bunchOfMessages.push(message);
          }
          this.bunchOfMessages = this.bunchOfMessages.reverse();
        }
        else {
          this.errMsg = response.error.message;
        }
      },
      error => {
        this.errMsg = error.message;
      }
    )
    this.RollDown();
    this.ClearInput();
  }

  AddMessage() {
    let message = new Message();
    message.username = this.getUsername();
    message.content = this.RandomText();
    message.time = new Date();
    this.bunchOfMessages.push(message);
  }

  ClearInput() {
    this.messageForm = new MessageForm();
    this.messageForm.room_gid = this.room_gid;
  }

  RandomText() {
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
