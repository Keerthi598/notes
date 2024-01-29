import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AlertInterface } from '../alert/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private alert$ = new Subject<AlertInterface>();

  setCompAlert(alert: AlertInterface): void {
    this.alert$.next(alert);
  }

  getCompAlert(): Observable<AlertInterface> {
    return this.alert$.asObservable();
  }
}
