import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuth } from '../dtos/userAuth.dto';

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {
  api_URL = "http://localhost:3000"; 
  constructor(private http: HttpClient) {}

  // getTest(){
  //   return this.http.get(this.testURL);
  // }

  async auth(email: string, pass: string) {
    return this.http.post<UserAuth>(this.api_URL + "/sign-in",
    {"email": email, "pass": pass});
  }

}
