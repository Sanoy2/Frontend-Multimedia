import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RoomService {

    constructor(private http: HttpClient) {

    }

    GetHttpOptions(uuid: string) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'authorization' : uuid
            })
        };
        return httpOptions;
    }    

    CreateRoom(uuid: string, onSuccess, onError) {
        let httpOptions = this.GetHttpOptions(uuid);
        this.http.post('http://localhost:8000/create-room', {}, httpOptions).subscribe(
            success => {
                onSuccess(success)
            }, error => {
                onError(error)
            }
        )
    };
}