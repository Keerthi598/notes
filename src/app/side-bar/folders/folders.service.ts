import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserFolder } from "../../dtos/userFolders.dto";

@Injectable({
    providedIn: 'root'
})
export class FoldersService {
    api_URL = "http://localhost:3000"; 

    constructor(private http: HttpClient) {}

    async getFolders() {
        const jwt = sessionStorage.getItem('token');
        return this.http.post<UserFolder>(this.api_URL + "/user-fol",
        {"access_token" : jwt});
    }

    async createFolders(folderName: string) {
        const jwt = sessionStorage.getItem('token');
        var response = this.http.post<boolean>("http://localhost:3000/create-folder",
        {"access_token" : jwt, "folder" : folderName});
        // this.http.post<UserFolder>(this.api_URL + "/user-dash",
        // {"access_token" : jwt});
        return response;
    }
    
}
