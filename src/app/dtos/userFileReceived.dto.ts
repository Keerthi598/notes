export interface UserFileRe {
    type: string;
    data: any;
}

export interface UserFileReceived {
    fileData: UserFileRe,
    fileMetaData: {
        fileId: string,
        folder: string,
        file: File,
        favorite: boolean
    }
}

// {
//   "type": "Buffer",
//   "data": []
// }