import { File } from "./userFolderFiles.dto"

export interface DashFiles {
    dashFiles: Array<DashFile>
}

export interface DashFile {
    fileId: string,
    content: File
}
