import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAuth } from '../dtos/userAuth.dto';

@Injectable({
    providedIn: 'root'
  })
  export class SignUpPageService {
    api_URL = "http://localhost:3000"; 
    constructor(private http: HttpClient) {}
  
    async signUp(email: string, pass: string) {
      return this.http.post<UserAuth>(this.api_URL + "/sign-up",
      {"email": email, "pass": pass});
    }
  
  }
  