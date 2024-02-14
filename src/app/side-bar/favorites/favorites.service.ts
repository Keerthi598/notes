import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FolderFiles } from '../../dtos/userFolderFiles.dto';
import { ApiURL } from "../../const/apiURL.service";

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {

    constructor(
        private http: HttpClient,
        private apiConst: ApiURL 
        ) {}

    async getFavFiles() {
        const jwt = sessionStorage.getItem('token');
        return this.http.post<FolderFiles>(this.apiConst.api_URL + "/user-fav",
        {"access_token" : jwt});
    }
}