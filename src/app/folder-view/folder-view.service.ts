import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FolderFiles } from "../dtos/userFolderFiles.dto";
import { UserFile } from "../dtos/userFile.dto";
import { ApiURL } from "../const/apiURL.service";

@Injectable({
    providedIn: 'root'
})
export class FolderViewService {
    constructor(
        private http: HttpClient,
        private apiConst: ApiURL 
        ) {}

    async getFolderFiles(folderName: string) {
        const jwt = sessionStorage.getItem('token');
        return this.http.post<FolderFiles>(this.apiConst.api_URL + "/folder-files",
        {"access_token" : jwt, "folder" : folderName});
    }

    async createFolder(folderName: string) {
        const jwt = sessionStorage.getItem('token');
        return this.http.post<UserFile>(this.apiConst.api_URL + "/create-file",
        {"access_token" : jwt, "folder" : folderName});
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
                )
        }


    async deleteFolder(
        folderName: string
    ) {
        const jwt = sessionStorage.getItem('token');
            return this.http.post<boolean>(
                this.apiConst.api_URL + "/delete-folder",
            {
                "access_token" : jwt,
                "folder" : folderName,
            }
            )
    }
}