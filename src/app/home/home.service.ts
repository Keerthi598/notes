import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AlertInterface } from '../alert/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private alert$ = new Subject<AlertInterface>();

  private deleteF$ = new Subject<boolean>();
  private deleteCon$ = new Subject<boolean>();
  
  private deleteAccountReq$ = new Subject<boolean>();
  private deleteAccountCon$ = new Subject<boolean>();

  setCompAlert(alert: AlertInterface): void {
    this.alert$.next(alert);
  }

  getCompAlert(): Observable<AlertInterface> {
    return this.alert$.asObservable();
  }

  // File Del
  setDeleteDCheck(deleteCon: boolean) {
    this.deleteF$.next(deleteCon);
  }

  getDeleteDCheck(): Observable<boolean> {
    return this.deleteF$.asObservable();
  }

  deleteConfirmation(conf: boolean) {
    this.deleteCon$.next(conf);
  }

  getDeleteCon(): Observable<boolean> {
    return this.deleteCon$.asObservable();
  }

  // Acc Del
  sendDeleteAccountReq(req: boolean) {
    this.deleteAccountReq$.next(req);
  }

  getDeleteAccountReq(): Observable<boolean> {
    return this.deleteAccountReq$.asObservable();
  }

  deleteAccConfirmation(accDelConf: boolean) {
    this.deleteAccountCon$.next(accDelConf);
  }

  getAccDeleteCon(): Observable<boolean> {
    return this.deleteAccountCon$.asObservable();
  }
}
