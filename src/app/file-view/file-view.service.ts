import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserFileReceived } from "../dtos/userFileReceived.dto";
import { ApiURL } from "../const/apiURL.service";

@Injectable({
    providedIn: 'root'
})
export class FileViewService {
    constructor(
        private http: HttpClient,
        private apiConst: ApiURL 
        ) {}

    async getFile(folderName: string, fileId: string) {
        const jwt = sessionStorage.getItem('token');
        return this.http.post<UserFileReceived>(this.apiConst.api_URL + "/get-file", 
        {"access_token" : jwt, "folder" : folderName, "fileId" : fileId});
    }

    async upFile(folderName: string, fileId: string, content: string, isFavorite: boolean) {
        const jwt = sessionStorage.getItem('token');
        return this.http.post(this.apiConst.api_URL + '/upload-file',
        {
            "access_token" : jwt,
            "folder" : folderName,
            "fileId" : fileId,
            "content" : content,
            "isFavorite": isFavorite,
        });
    }

    async toggleFavOn(folderName: string, fileId: string, content: string, isFavorite: boolean) {
        const jwt = sessionStorage.getItem('token');
        return this.http.post(this.apiConst.api_URL + '/fav-this',
        {
            "access_token" : jwt,
            "folder" : folderName,
            "fileId" : fileId,
            "content" : content,
            "isFavorite": isFavorite,
        });
    }

    async deleteFile(
        folderName: string,
        fileId: string,
        isFav: boolean
        ) {
            const jwt = sessionStorage.getItem('token');
            return this.http.post<boolean>(
                this.apiConst.api_URL + "/delete-file",
                {
                    "access_token" : jwt,
                    "folder" : folderName,
                    "fileId" : fileId,
                    "content" : "",
                    "isFavorite" : isFav
                }
            );
        }
}