import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DoubleCheckService {
    private deleteF$ = new Subject<boolean>();
    private deleteConf$ = new Subject<boolean>();

    private deleteAccReq$ = new Subject<boolean>();
    private deleteAccConf$ = new Subject<boolean>();

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


    // Account Deletion 

    setAccDelete(deleteAcc: boolean): void {
        this.deleteAccReq$.next(deleteAcc);
    }

    getAccDelete(): Observable<boolean> {
        return this.deleteAccReq$.asObservable();
    }

    confirmAccountDelete(conf: boolean) {
        this.deleteAccConf$.next(conf);
    }

    getAccountDelConf(): Observable<boolean> {
        return this.deleteAccConf$.asObservable();
    }
    
}