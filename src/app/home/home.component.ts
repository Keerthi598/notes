import { Component, OnInit, ViewChild } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { DashComponent } from '../dash/dash.component';
import { AlertComponent } from '../alert/alert.component';
import { AlertService } from '../alert/alert.service';
import { HomeService } from './home.service';
import { AlertInterface } from '../alert/alert.interface';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    SideBarComponent,
    DashComponent,
    AlertComponent,
  ],
  providers: [HomeService, AlertService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: {'class' : 'w-full'}
})
export class HomeComponent implements OnInit {
  @ViewChild(SideBarComponent) private sideBar!: SideBarComponent;

  constructor(
    private homeService: HomeService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.homeService.getCompAlert().subscribe(
      alert => {
        this.alertService.setAlert(alert);
        this.sideBar.ReloadSideBar();
      }
    )
  }


}
