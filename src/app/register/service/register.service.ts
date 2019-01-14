import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegistrationForm } from '../../models/RegistrationForm';

@Injectable()
export class RegisterService {

    constructor(private http: HttpClient) {

    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    Register(form: RegistrationForm, onSuccess, onError) {
        this.http.post('http://localhost:8000/register', form, this.httpOptions).subscribe(
            succcess => {
                onSuccess(succcess)
            }, error => {
                onError(error)
            }
        )
    };
}