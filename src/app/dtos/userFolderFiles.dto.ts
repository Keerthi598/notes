export interface Date {
    seconds: number;
    nanoseconds: number;
}

export interface File {
    noteHead: string;
    folder: string;
    fileId: string;
    date: Date;
}

export interface FolderFiles {
    folder: File[];
}