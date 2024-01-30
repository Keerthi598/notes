import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Inject } from "@nestjs/common";
import { UserFileReceived } from "../dtos/userFileReceived.dto";

@Injectable({
    providedIn: 'root'
})
export class FileViewService {
    api_URL = "http://localhost:3000"; 

    constructor(@Inject() private http: HttpClient) {}

    async getFile(folderName: string, fileId: string) {
        const jwt = sessionStorage.getItem('token');
        return this.http.post<UserFileReceived>(this.api_URL + "/get-file", 
        {"access_token" : jwt, "folder" : folderName, "fileId" : fileId});
    }

    async upFile(folderName: string, fileId: string, content: string, isFavorite: boolean) {
        const jwt = sessionStorage.getItem('token');
        return this.http.post(this.api_URL + '/upload-file',
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
        return this.http.post(this.api_URL + '/fav-this',
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
                this.api_URL + "/delete-file",
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