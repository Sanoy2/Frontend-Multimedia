import { Component, OnInit } from '@angular/core';
import { ChatService } from './service/chat.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
  msg: string = '';
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

    if(!this.room_gid){
      this.router.navigate(['/room']);
    }
  }



}
