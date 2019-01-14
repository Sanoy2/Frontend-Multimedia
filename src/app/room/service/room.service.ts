import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoomService {

    constructor(private http: HttpClient) {
        
    }
}