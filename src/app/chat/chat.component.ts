import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from './service/chat.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Message } from '../models/message';
import { MessageForm } from '../models/MessageForm';
import { ChatSocketService } from './service/chat.socketService';
import { ToastrService } from 'ngx-toastr';

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
    private route: ActivatedRoute,
    private socket: ChatSocketService,
    private toastr: ToastrService) {
  }

  uuid: string = '';
  username: string = '';
  room_gid: string = '';
  messageForm: MessageForm;
  bunchOfMessages: Array<Message> = new Array();
  errMsg: string = null;
  private sub: any;

  ngOnInit() {
    this.socket.listen('disconnect', () => {
      console.log('disconnected');
      this.socket.disconnect();
      this.router.navigate(['/room'], { replaceUrl: true });
    })

    this.uuid = this.cookieService.get('uuid');
    this.username = this.cookieService.get('username');

    this.sub = this.route.params.subscribe(params => {
      this.room_gid = params['room_gid'];
      this.socket.emit(
        'auth',
        JSON.stringify(
          {
            uuid: this.uuid,
            room_gid: this.room_gid
          }
        ),
        () => this.initListening());
    });

    if (!this.uuid && !this.username) {
      this.router.navigate(['/login']);
    }

    if (!this.room_gid) {
      this.router.navigate(['/room']);
    }

    this.GetAllMessages();
    this.messageForm = new MessageForm();
    this.messageForm.room_gid = this.room_gid;
  }

  initListening(): void {
    this.socket.listen('message', (data) => {
      const message = new Message();
      message.username = data.sender.username;
      message.content = data.msg.txt;
      message.time = this.CreateDate(data.msg.timestamp);
      this.bunchOfMessages.push(message);
      this.SortMessages();
    });

    this.socket.listen('join_room', (data) => {
      this.toastr.success('User <b>' + data.user + '</b> joined channel', 'Notificication');
    });

    this.socket.listen('leave_room', (data) => {
      this.toastr.warning('User <b>' + data.user + '</b> left channel', 'Notification');
    });
  }

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  ngAfterViewChecked(): void {
    this.ScrollToBottom();
  }

  ScrollToBottom(): void {
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
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.Send();
    }
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
            message.time = this.CreateDate(response.data[i].msg.timestamp);
            this.bunchOfMessages.push(message);
          }
          this.SortMessages();
        }
        else {
          this.router.navigate(['/room']);
        }
      },
      error => {
        this.router.navigate(['/room']);
      }
    )
  }

  SortMessages() {
    this.bunchOfMessages = this.bunchOfMessages.sort((leftSide, rightSide): number => {
      if (leftSide.time.getTime() < rightSide.time.getTime()) return -1;
      if (leftSide.time.getTime() > rightSide.time.getTime()) return 1;
      return 0;
    });
  }

  ClearInput() {
    setTimeout(() => {
      this.messageForm = new MessageForm();
      this.messageForm.room_gid = this.room_gid;
    }, 50);
  }

  CreateDate(timestamp: number): Date {
    return new Date(timestamp * 1000);
  }
}
