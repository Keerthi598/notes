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

  setCompAlert(alert: AlertInterface): void {
    this.alert$.next(alert);
  }

  getCompAlert(): Observable<AlertInterface> {
    return this.alert$.asObservable();
  }

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
}
