import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FolderFiles } from "../dtos/userFolderFiles.dto";

@Injectable({
    providedIn: 'root'
})
export class FolderViewService {
    api_URL = "http://localhost:3000"; 

    constructor(private http: HttpClient) {}

    async getFolderFiles(folderName: string) {
        const jwt = sessionStorage.getItem('token');
        return this.http.post<FolderFiles>(this.api_URL + "/folder-files",
        {"access_token" : jwt, "folder" : folderName});
    }
}