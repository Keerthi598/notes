import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuth } from '../dtos/userAuth.dto';
import { ApiURL } from '../const/apiURL.service';

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {

  constructor(
    private http: HttpClient,
    private apiConst: ApiURL 
    ) {}

  async auth(email: string, pass: string) {
    return this.http.post<UserAuth>(this.apiConst.api_URL + "/sign-in",
    {"email": email, "pass": pass});
  }

}
