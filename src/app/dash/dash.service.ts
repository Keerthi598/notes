import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DashFiles} from "../dtos/dashFiles.dto";
import { ApiURL } from "../const/apiURL.service";

@Injectable({
    providedIn: 'root'
})
export class DashService {
    constructor(
        private http: HttpClient,
        private apiConst: ApiURL 
        ) {}

    async getDashFiles() {
        const jwt = sessionStorage.getItem('token');
        return this.http.post<DashFiles>(this.apiConst.api_URL + "/user-dash",
        {"access_token" : jwt});
    }
}