import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginForm } from '../../models/LoginForm';


@Injectable()
export class LoginService {

    constructor(private http: HttpClient) {

    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    Register(form: LoginForm, onSuccess, onError) {
        this.http.post('http://localhost:8000/login', form, this.httpOptions).subscribe(
            success => {
                onSuccess(success)
            }, error => {
                onError(error)
            }
        )
    };
}