import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FolderFiles } from "../dtos/userFolderFiles.dto";
import { Inject } from "@nestjs/common";
import { UserFile } from "../dtos/userFile.dto";

@Injectable({
    providedIn: 'root'
})
export class FolderViewService {
    api_URL = "http://localhost:3000"; 

    constructor(@Inject() private http: HttpClient) {}

    async getFolderFiles(folderName: string) {
        const jwt = sessionStorage.getItem('token');
        return this.http.post<FolderFiles>(this.api_URL + "/folder-files",
        {"access_token" : jwt, "folder" : folderName});
    }

    async createFolder(folderName: string) {
        const jwt = sessionStorage.getItem('token');
        return this.http.post<UserFile>(this.api_URL + "/create-file",
        {"access_token" : jwt, "folder" : folderName});
    }
}