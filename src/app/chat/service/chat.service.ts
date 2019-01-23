import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../../models/message';
import { MessageForm } from '../../models/MessageForm';
import { CookieService } from 'ngx-cookie-service';
import { ChatSocketService } from './chat.socketService';


@Injectable()
export class ChatService {

    constructor(
        private http: HttpClient,
        private cookieService: CookieService) {
            
    }

    GetHttpOptions(uuid: string) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization': uuid
            })
        };
        return httpOptions;
    }

    GetMessages(room_gid: string, onSuccess, onError) {
        let uuid = this.cookieService.get('uuid');
        let path: string = 'http://localhost:8000' + '/get-room-history?room_gid=' + room_gid;
        this.http.get(path, this.GetHttpOptions(uuid)).subscribe(
            success => {
                onSuccess(success)
            }, error => {
                onError(error)
            }
        );
    }

    SendMessage(messageForm: MessageForm, onSuccess, onError) {
        let uuid = this.cookieService.get('uuid');
        let path: string = 'http://localhost:8000/send-message';
        
        this.http.post(path, messageForm, this.GetHttpOptions(uuid)).subscribe(
            success => {
                onSuccess(success)
            }, error => {
                onError(error)
            }
        )
    };
}