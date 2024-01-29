import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIf } from '@angular/common';
import { AlertInterface } from './alert.interface';
import { AlertEnum } from './alert.enum';
import { FormsModule } from '@angular/forms';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    FontAwesomeModule, 
    NgIf,
    FormsModule,
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  host: {'class' : 'bottom-5 w-full fixed z-10'},

})
export class AlertComponent implements OnInit {
  alert?: AlertInterface;
  timeoutId?: number;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.getAlert().subscribe(
      alert => {
        this.alert = alert;
        this.resetTimer();
      }
    )
  }

  resetTimer(): void {
    this.timeoutId = window.setTimeout(() => {
      this.alert = undefined;
    }, 3000);
  }
}
