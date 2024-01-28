export interface Date {
    seconds: number;
    nanoseconds: number;
}

export interface File {
    noteHead: string;
    folder: string;
    date: Date;
    favorite: boolean;
}

export interface FolderFiles {
    folder: Record<string, File>;
}