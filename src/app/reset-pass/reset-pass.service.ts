import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorCodeResp } from '../dtos/errorCodeResp.dto';

@Injectable({
    providedIn: 'root'
})
export class ResetPassService {
    api_URL = "http://localhost:3000"; 
    constructor(private http: HttpClient) {}

    async sendResetMail(email: string) {
        return this.http.post<ErrorCodeResp>(this.api_URL + "/reset-pass",
        {"email": email, "pass": ""});
    }
}