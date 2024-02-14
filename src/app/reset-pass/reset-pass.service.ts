import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorCodeResp } from '../dtos/errorCodeResp.dto';
import { ApiURL } from '../const/apiURL.service';

@Injectable({
    providedIn: 'root'
})
export class ResetPassService {
    constructor(
        private http: HttpClient,
        private apiConst: ApiURL 
        ) {}

    async sendResetMail(email: string) {
        return this.http.post<ErrorCodeResp>(this.apiConst.api_URL + "/reset-pass",
        {"email": email, "pass": ""});
    }
}