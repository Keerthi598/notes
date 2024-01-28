import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Inject } from "@nestjs/common";
import { DashFiles} from "../dtos/dashFiles.dto";

@Injectable({
    providedIn: 'root'
})
export class DashService {
    api_URL = "http://localhost:3000"; 

    constructor(@Inject() private http: HttpClient) {}

    async getDashFiles() {
        const jwt = sessionStorage.getItem('token');
        return this.http.post<DashFiles>(this.api_URL + "/user-dash",
        {"access_token" : jwt});
    }
}