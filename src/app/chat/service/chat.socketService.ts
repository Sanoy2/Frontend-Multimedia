import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../../models/message';
import { MessageForm } from '../../models/MessageForm';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class ChatSocketService {

    constructor(private socket: Socket) {
        let a = this.socket.connect();
        console.log(a);
    }


    sendMessage(msg: string){
        // this.socket.emit("message", msg);
    }
}