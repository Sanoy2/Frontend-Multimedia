import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../../models/message';
import { MessageForm } from '../../models/MessageForm';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class ChatSocketService {

    connected = true;

    constructor(private socket: Socket) {
        if (!this.connected) {
            this.socket.connect();
            this.connected = true;
        }

    }

    listen(event: string, fcn: Function) {
        if (!this.connected) {
            this.socket.connect();
            this.connected = true;
        }
        this.socket.on(event, (msg: string) => {
            fcn(msg);
        });
    }


    emit(event: string, msg: string, callback?: Function) {
        if (!this.connected) {
            this.socket.connect();
            this.connected = true;
        }
        this.socket.emit(event, msg, callback);
    }

    disconnect() {
        this.socket.removeAllListeners();
        this.socket.disconnect();
        this.connected = false;
    }
}