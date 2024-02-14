import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserFolder } from "../../dtos/userFolders.dto";
import { ApiURL } from "../../const/apiURL.service";

@Injectable({
    providedIn: 'root'
})
export class FoldersService {

    constructor(
        private http: HttpClient,
        private apiConst: ApiURL 
        ) {}

    async getFolders() {
        const jwt = sessionStorage.getItem('token');
        return this.http.post<UserFolder>(this.apiConst.api_URL + "/user-fol",
        {"access_token" : jwt});
    }

    async createFolders(folderName: string) {
        const jwt = sessionStorage.getItem('token');
        var response = this.http.post<boolean>( this.apiConst.api_URL +  "/create-folder",
        {"access_token" : jwt, "folder" : folderName});

        return response;
    }
    
}
