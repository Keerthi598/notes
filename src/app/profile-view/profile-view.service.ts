import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userEmail } from '../dtos/userEmailInfo.dto';

@Injectable({
    providedIn: 'root'
  })
export class ProfileViewService {
    api_URL = "http://localhost:3000"; 
    constructor(private http: HttpClient) {}

    async getEmail() {
        const jwt = sessionStorage.getItem('token');
        return this.http.post<userEmail>(this.api_URL + "/get-email",
        { "access_token" : jwt });
      }
}