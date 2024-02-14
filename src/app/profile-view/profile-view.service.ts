import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userEmail } from '../dtos/userEmailInfo.dto';
import { ProcessResponse } from '../dtos/processResponse.dto';
import { ApiURL } from '../const/apiURL.service';

@Injectable({
    providedIn: 'root'
  })
export class ProfileViewService {
  constructor(
    private http: HttpClient,
    private apiConst: ApiURL 
    ) {}

    async getEmail() {
        const jwt = sessionStorage.getItem('token');
        return this.http.post<userEmail>(this.apiConst.api_URL + "/get-email",
        { "access_token" : jwt });
      }

    async changePass(newPass: string) {
      const jwt = sessionStorage.getItem('token');
      return this.http.post<ProcessResponse>(this.apiConst.api_URL + '/change-cred',
      { "access_token" : jwt, "newPass" : newPass});
    }

    async deleteUser() {
      const jwt = sessionStorage.getItem('token');
      return this.http.post(this.apiConst.api_URL + "/delete-user",
      { "access_token" : jwt });
    }
}