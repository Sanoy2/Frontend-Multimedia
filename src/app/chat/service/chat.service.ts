import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class ChatService {

    constructor(private http: HttpClient) {

    }

    // GetHttpOptions(uuid: string) {
    //     let httpOptions = {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json',
    //             'authorization' : uuid
    //         })
    //     };
    //     return httpOptions;
    // }   

    // Register(form: LoginForm, onSuccess, onError) {
    //     this.http.post('http://localhost:8000/login', form, this.httpOptions).subscribe(
    //         success => {
    //             onSuccess(success)
    //         }, error => {
    //             onError(error)
    //         }
    //     )
    // };
}