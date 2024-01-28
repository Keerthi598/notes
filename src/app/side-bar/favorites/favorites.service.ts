import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FolderFiles } from '../../dtos/userFolderFiles.dto';

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {
    api_URL = "http://localhost:3000"; 

    constructor(private http: HttpClient) {}

    async getFavFiles() {
        const jwt = sessionStorage.getItem('token');
        return this.http.post<FolderFiles>(this.api_URL + "/user-fav",
        {"access_token" : jwt});
    }
}