import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAuth } from '../dtos/userAuth.dto';
import { ApiURL } from '../const/apiURL.service';

@Injectable({
    providedIn: 'root'
  })
  export class SignUpPageService {
    
    constructor(
      private http: HttpClient,
      private apiConst: ApiURL 
      ) {}
  
    async signUp(email: string, pass: string) {
      return this.http.post<UserAuth>(this.apiConst.api_URL + "/sign-up",
      {"email": email, "pass": pass});
    }
  
  }
  