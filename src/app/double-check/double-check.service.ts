import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DoubleCheckService {
    private deleteF$ = new Subject<boolean>();
    private deleteConf$ = new Subject<boolean>();

    setDelete(deleteCon: boolean): void {
        this.deleteF$.next(deleteCon);
    }

    getDelete(): Observable<boolean> {
        return this.deleteF$.asObservable();
    }

    confirmDelete(conf: boolean) : void {
        this.deleteConf$.next(conf);
    }

    getDeleteConf(): Observable<boolean> {
        return this.deleteConf$.asObservable();
    }
    
}